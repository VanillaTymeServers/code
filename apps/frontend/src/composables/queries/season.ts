import type { AbstractModrinthClient, Labrinth } from '@modrinth/api-client'

import { STALE_TIME } from './project'

/** Finds shops in the season marked current, the same default the discover page uses. */
export async function fetchCurrentSeasonShops(
	client: AbstractModrinthClient,
	params: Labrinth.Search.SearchParams,
) {
	const seasons = await client.labrinth.tags_v3.getSeasons()
	const currentSeason = seasons.find((season) => season.current)
	if (!currentSeason) return []

	const results = await client.labrinth.projects_v3.search({
		...params,
		facets: [['project_types:shop'], [`shop.season:${currentSeason.id}`]],
	})
	return results.hits ?? []
}

export const seasonQueryOptions = {
	list: (client: AbstractModrinthClient) => ({
		queryKey: ['tags', 'seasons', 'v3'] as const,
		queryFn: () => client.labrinth.tags_v3.getSeasons(),
		staleTime: STALE_TIME,
	}),
}
