import type { RowDataPacket } from 'mysql2/promise'

import { readEnv } from '~/helpers/env'

const SORT_COLUMNS = {
	today: 'DailyTotal',
	week: 'WeeklyTotal',
	month: 'MonthTotal',
	season: 'AllTimeTotal',
	all: 'LifetimeTotal',
} as const

/** Each saved season's votes per player, written by Tyme's `/archivevotes` at every reset. */
const ARCHIVE_TABLE = 'vt_season_votes'

interface VotingPluginUserRow extends RowDataPacket {
	uuid: string
	PlayerName: string
	DailyTotal: number
	WeeklyTotal: number
	MonthTotal: number
	AllTimeTotal: number
	LifetimeTotal: number
	DayVoteStreak: number
}

export interface VoteLeaderboardEntry {
	uuid: string
	username: string
	daily: number
	weekly: number
	monthly: number
	season: number
	allTime: number
	dayStreak: number
}

export default defineEventHandler(async (event): Promise<VoteLeaderboardEntry[]> => {
	const query = getQuery(event)
	const order = String(query.order ?? 'season').toLowerCase()
	const sortColumn = SORT_COLUMNS[order as keyof typeof SORT_COLUMNS] ?? SORT_COLUMNS.season
	const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100)
	const username = String(query.username ?? '').trim()

	const table = (await readEnv('GAME_DB_VOTING_TABLE')) ?? 'vote_VotingPlugin_Users'
	if (!/^\w+$/.test(table)) {
		throw createError({ statusCode: 500, statusMessage: 'invalid voting table name' })
	}

	const db = await useGameDb()

	/** VotingPlugin's AllTimeTotal is reset every season, so lifetime votes add the saved seasons back on. */
	const selectRows = (withArchive: boolean) =>
		db.query<VotingPluginUserRow[]>(
			`SELECT u.uuid, u.PlayerName, u.DailyTotal, u.WeeklyTotal, u.MonthTotal, u.AllTimeTotal, u.DayVoteStreak,
				CAST(u.AllTimeTotal + ${withArchive ? 'COALESCE(a.votes, 0)' : '0'} AS SIGNED) AS LifetimeTotal
			FROM \`${table}\` u
			${withArchive ? `LEFT JOIN (SELECT uuid, SUM(votes) AS votes FROM ${ARCHIVE_TABLE} GROUP BY uuid) a ON a.uuid = u.uuid` : ''}
			${username ? 'WHERE u.PlayerName LIKE ?' : ''}
			ORDER BY ${sortColumn} DESC
			LIMIT ?`,
			username ? [`%${username}%`, limit] : [limit],
		)

	// Tyme creates the archive table on its first connection, so it can be missing until then.
	const [rows] = await selectRows(true).catch((error) => {
		if (error?.code === 'ER_NO_SUCH_TABLE') return selectRows(false)
		throw error
	})

	return rows.map((row) => ({
		uuid: row.uuid,
		username: row.PlayerName,
		daily: row.DailyTotal,
		weekly: row.WeeklyTotal,
		monthly: row.MonthTotal,
		season: row.AllTimeTotal,
		allTime: Number(row.LifetimeTotal),
		dayStreak: row.DayVoteStreak,
	}))
})
