import type { Pool, RowDataPacket } from 'mysql2/promise'

/** One row per finished weekly competition, written by Tyme when the podium freezes. */
const COMPETITIONS_TABLE = 'vt_competitions'

/** Every player's final place and score in each competition. */
const RESULTS_TABLE = 'vt_competition_results'

interface CompetitionRow extends RowDataPacket {
	id: number
	season: number
	title: string
	category: string | null
	criteria: string | null
	mystery: number
	started_at: number | null
	ended_at: number
	updated_at: number | null
}

interface ResultRow extends RowDataPacket {
	competition_id: number
	place: number
	player_name: string
	uuid: string | null
	score: number
}

export interface CompetitionResult {
	place: number
	username: string
	/** Null for a scoreboard name that isn't a known player. */
	uuid: string | null
	score: number
}

export interface Competition {
	id: number
	season: number
	title: string
	category: string | null
	/** The statistic it counted, e.g. `minecraft.mined:minecraft.calcite`. */
	criteria: string | null
	mystery: boolean
	/** Epoch millis. For the live week, when it will end (0 when there's no end time). */
	endedAt: number
	/**
	 * True for every week imported from the old spreadsheet (everything before Season 11), which only
	 * recorded the top 3. Tyme saves a start time with every week it records, and the import has none.
	 */
	onlyPodium: boolean
	results: CompetitionResult[]
}

export interface LiveCompetition extends Competition {
	/** When Tyme last saved these standings, epoch millis. */
	updatedAt: number
}

function errorCode(error: unknown) {
	return (error as { code?: string })?.code
}

/** Tyme creates the tables on its first save, so they can be missing until then. */
function isMissingTable(error: unknown) {
	return errorCode(error) === 'ER_NO_SUCH_TABLE'
}

/** The `live` column only exists once a Tyme version with live standings has started. */
function isMissingColumn(error: unknown) {
	return errorCode(error) === 'ER_BAD_FIELD_ERROR'
}

/** Every season that has at least one finished competition, newest first. */
export async function competitionSeasons(db: Pool): Promise<number[]> {
	const query = (finishedOnly: boolean) =>
		db.query<RowDataPacket[]>(
			`SELECT DISTINCT season FROM ${COMPETITIONS_TABLE}
			${finishedOnly ? 'WHERE live = FALSE' : ''}
			ORDER BY season DESC`,
		)
	try {
		const [rows] = await query(true).catch((error) => {
			if (isMissingColumn(error)) return query(false)
			throw error
		})
		return rows.map((row) => Number(row.season))
	} catch (error) {
		if (isMissingTable(error)) return []
		throw error
	}
}

/** Finished competitions matching `where`, newest first, each with its full results. */
export async function findCompetitions(
	db: Pool,
	where: { season?: number; limit?: number },
): Promise<Competition[]> {
	return queryCompetitions(db, { ...where, live: false })
}

/** The running week's standings as of Tyme's last snapshot, or null when nothing is live. */
export async function findLiveCompetition(db: Pool): Promise<LiveCompetition | null> {
	const [live] = await queryCompetitions(db, { live: true, limit: 1 })
	return (live as LiveCompetition | undefined) ?? null
}

async function queryCompetitions(
	db: Pool,
	where: { season?: number; limit?: number; live: boolean },
): Promise<(Competition & { updatedAt: number })[]> {
	const limit = where.limit ? `LIMIT ${Math.max(1, Math.floor(where.limit))}` : ''
	const select = (withLiveColumns: boolean) => {
		const conditions: string[] = []
		const params: number[] = []
		if (withLiveColumns) {
			conditions.push(where.live ? 'live = TRUE' : 'live = FALSE')
		}
		if (where.season) {
			conditions.push('season = ?')
			params.push(where.season)
		}
		return db.query<CompetitionRow[]>(
			`SELECT id, season, title, category, criteria, mystery, started_at, ended_at,
				${withLiveColumns ? 'updated_at' : 'NULL AS updated_at'}
			FROM ${COMPETITIONS_TABLE}
			${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
			ORDER BY ended_at DESC ${limit}`,
			params,
		)
	}

	let competitions: CompetitionRow[]
	try {
		;[competitions] = await select(true).catch((error) => {
			// Before Tyme adds the live columns, every row is a finished week.
			if (isMissingColumn(error) && !where.live) return select(false)
			throw error
		})
	} catch (error) {
		if (isMissingTable(error) || isMissingColumn(error)) return []
		throw error
	}
	if (competitions.length === 0) return []

	const [results] = await db.query<ResultRow[]>(
		`SELECT competition_id, place, player_name, uuid, score
		FROM ${RESULTS_TABLE}
		WHERE competition_id IN (?)
		ORDER BY place`,
		[competitions.map((competition) => competition.id)],
	)

	const byCompetition = new Map<number, CompetitionResult[]>()
	for (const row of results) {
		const list = byCompetition.get(row.competition_id) ?? []
		list.push({
			place: row.place,
			username: row.player_name,
			uuid: row.uuid,
			score: Number(row.score),
		})
		byCompetition.set(row.competition_id, list)
	}

	return competitions.map((row) => ({
		id: row.id,
		season: row.season,
		title: row.title,
		category: row.category,
		criteria: row.criteria,
		mystery: !!row.mystery,
		endedAt: Number(row.ended_at),
		onlyPodium: row.started_at === null,
		updatedAt: Number(row.updated_at ?? 0),
		results: byCompetition.get(row.id) ?? [],
	}))
}
