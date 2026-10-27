import type { AbstractModrinthClient } from '@modrinth/api-client'

import { STALE_TIME } from './project'

/**
 * Queries for the Tebex store. The basket is personal, so it is only fetched in the browser.
 */
export const storeQueryOptions = {
	webstore: (token: string, client: AbstractModrinthClient) => ({
		queryKey: ['store', 'webstore'] as const,
		queryFn: () => client.tebex.headless.getWebstore(token),
		staleTime: STALE_TIME,
	}),

	categories: (token: string, client: AbstractModrinthClient) => ({
		queryKey: ['store', 'categories'] as const,
		queryFn: () => client.tebex.headless.getCategories(token),
		staleTime: STALE_TIME,
	}),

	package: (token: string, packageId: string, client: AbstractModrinthClient) => ({
		queryKey: ['store', 'package', packageId] as const,
		queryFn: () => client.tebex.headless.getPackage(token, packageId),
		staleTime: STALE_TIME,
	}),

	sales: (token: string, client: AbstractModrinthClient) => ({
		queryKey: ['store', 'sales'] as const,
		queryFn: () => client.tebex.headless.getSales(token),
		staleTime: STALE_TIME,
	}),

	sidebar: (token: string, client: AbstractModrinthClient) => ({
		queryKey: ['store', 'sidebar'] as const,
		queryFn: () => client.tebex.headless.getSidebar(token),
		staleTime: STALE_TIME,
	}),

	basket: (token: string, basketIdent: string, client: AbstractModrinthClient) => ({
		queryKey: ['store', 'basket', basketIdent] as const,
		queryFn: () => client.tebex.headless.getBasket(token, basketIdent),
		enabled: import.meta.client && !!basketIdent,
	}),
}
