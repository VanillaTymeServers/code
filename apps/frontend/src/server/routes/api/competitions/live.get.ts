import { findLiveCompetition, type LiveCompetition } from '~/server/utils/competitions'

/** This week's standings while the competition runs, updated by Tyme every minute. Null when nothing is live. */
export default defineEventHandler(async (event): Promise<LiveCompetition | null> => {
	setResponseHeader(event, 'Cache-Control', 'no-store')
	const db = await useGameDb()
	return findLiveCompetition(db)
})
