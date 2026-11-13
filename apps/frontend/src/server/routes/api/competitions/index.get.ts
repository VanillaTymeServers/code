import { type Competition, competitionSeasons, findCompetitions } from '~/server/utils/competitions'

export interface CompetitionSeason {
	/** Every season with saved competitions, newest first. */
	seasons: number[]
	/** The season these competitions belong to, or null when nothing is saved yet. */
	season: number | null
	competitions: Competition[]
}

/** A season's weekly competitions, newest first. Defaults to the latest season with results. */
export default defineEventHandler(async (event): Promise<CompetitionSeason> => {
	const db = await useGameDb()
	const seasons = await competitionSeasons(db)

	const requested = Number(getQuery(event).season)
	const season = seasons.includes(requested) ? requested : (seasons[0] ?? null)

	return {
		seasons,
		season,
		competitions: season === null ? [] : await findCompetitions(db, { season }),
	}
})
