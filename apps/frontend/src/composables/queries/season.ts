import type { AbstractModrinthClient } from '@modrinth/api-client'

import { STALE_TIME } from './project'

export const seasonQueryOptions = {
	list: (client: AbstractModrinthClient) => ({
		queryKey: ['tags', 'seasons', 'v3'] as const,
		queryFn: () => client.labrinth.tags_v3.getSeasons(),
		staleTime: STALE_TIME,
	}),
}
