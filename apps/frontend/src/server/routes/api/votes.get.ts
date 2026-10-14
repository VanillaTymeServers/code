import type { RowDataPacket } from 'mysql2/promise'

import { readEnv } from '~/helpers/env'

const SORT_COLUMNS = {
	today: 'DailyTotal',
	week: 'WeeklyTotal',
	month: 'MonthTotal',
	all: 'AllTimeTotal',
} as const

interface VotingPluginUserRow extends RowDataPacket {
	uuid: string
	PlayerName: string
	DailyTotal: number
	WeeklyTotal: number
	MonthTotal: number
	AllTimeTotal: number
	DayVoteStreak: number
}

export interface VoteLeaderboardEntry {
	uuid: string
	username: string
	daily: number
	weekly: number
	monthly: number
	allTime: number
	dayStreak: number
}

export default defineEventHandler(async (event): Promise<VoteLeaderboardEntry[]> => {
	const query = getQuery(event)
	const order = String(query.order ?? 'all').toLowerCase()
	const sortColumn = SORT_COLUMNS[order as keyof typeof SORT_COLUMNS] ?? SORT_COLUMNS.all
	const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100)
	const username = String(query.username ?? '').trim()

	const table = (await readEnv('GAME_DB_VOTING_TABLE')) ?? 'vote_VotingPlugin_Users'
	if (!/^\w+$/.test(table)) {
		throw createError({ statusCode: 500, statusMessage: 'invalid voting table name' })
	}

	const db = await useGameDb()
	const [rows] = await db.query<VotingPluginUserRow[]>(
		`SELECT uuid, PlayerName, DailyTotal, WeeklyTotal, MonthTotal, AllTimeTotal, DayVoteStreak
		FROM \`${table}\`
		${username ? 'WHERE PlayerName LIKE ?' : ''}
		ORDER BY ${sortColumn} DESC
		LIMIT ?`,
		username ? [`%${username}%`, limit] : [limit],
	)

	return rows.map((row) => ({
		uuid: row.uuid,
		username: row.PlayerName,
		daily: row.DailyTotal,
		weekly: row.WeeklyTotal,
		monthly: row.MonthTotal,
		allTime: row.AllTimeTotal,
		dayStreak: row.DayVoteStreak,
	}))
})
