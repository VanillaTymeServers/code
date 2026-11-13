import { type Competition, findCompetitions } from '~/server/utils/competitions'

/** The most recently finished weekly competition, or null when nothing is saved yet. */
export default defineEventHandler(async (): Promise<Competition | null> => {
	const db = await useGameDb()
	const [latest] = await findCompetitions(db, { limit: 1 })
	return latest ?? null
})
