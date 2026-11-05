import { AbstractModule } from '../../../core/abstract-module'
import type { Labrinth } from '../types'

export class LabrinthStateModule extends AbstractModule {
	public getModuleID(): string {
		return 'labrinth_state'
	}

	/**
	 * Build the complete generated state by fetching from multiple endpoints
	 *
	 * @returns Promise resolving to the generated state containing categories, loaders, products, etc.
	 *
	 * @example
	 * ```typescript
	 * const state = await client.labrinth.state.build()
	 * console.log(state.products) // Available billing products
	 * ```
	 */
	public async build(): Promise<Labrinth.State.GeneratedState> {
		const errors: unknown[] = []
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handleError = (err: any, defaultValue: any, endpoint: string) => {
			console.error('Error fetching state data:', err)
			errors.push({ endpoint, error: err })
			return defaultValue
		}

		// TODO: as we add new modules, move these raw requests to actual
		// abstractions
		const [
			categories,
			loaders,
			gameVersions,
			donationPlatforms,
			reportTypes,
			products,
			iso3166Data,
			payoutMethods,
			globals,
		] = await Promise.all([
			// Tag endpoints
			this.client
				.request<Labrinth.Tags.v2.Category[]>('/tag/category', {
					api: 'labrinth',
					version: 2,
					method: 'GET',
				})
				.catch((err) => handleError(err, [], '/v2/tag/category')),
			this.client
				.request<Labrinth.Tags.v2.Loader[]>('/tag/loader', {
					api: 'labrinth',
					version: 2,
					method: 'GET',
				})
				.catch((err) => handleError(err, [], '/v2/tag/loader')),
			this.client
				.request<Labrinth.Tags.v2.GameVersion[]>('/tag/game_version', {
					api: 'labrinth',
					version: 2,
					method: 'GET',
				})
				.catch((err) => handleError(err, [], '/v2/tag/game_version')),
			this.client
				.request<Labrinth.Tags.v2.DonationPlatform[]>('/tag/donation_platform', {
					api: 'labrinth',
					version: 2,
					method: 'GET',
				})
				.catch((err) => handleError(err, [], '/v2/tag/donation_platform')),
			this.client
				.request<string[]>('/tag/report_type', { api: 'labrinth', version: 2, method: 'GET' })
				.catch((err) => handleError(err, [], '/v2/tag/report_type')),

			// Internal billing/mural endpoints
			this.client.labrinth.billing_internal
				.getProducts()
				.catch((err) => handleError(err, [], '/_internal/billing/products')),
			// ISO3166 country and subdivision data
			this.client.iso3166.data
				.build()
				.catch((err) => handleError(err, { countries: [], subdivisions: {} }, 'iso3166/data')),

			// Payout methods for tremendous ID mapping
			this.client
				.request<Labrinth.State.PayoutMethodInfo[]>('/payout/methods', {
					api: 'labrinth',
					version: 3,
					method: 'GET',
				})
				.catch((err) => handleError(err, [], '/v3/payout/methods')),

			// Global configuration
			this.client
				.request<{ tax_compliance_thresholds: Record<string, number> }>('/globals', {
					api: 'labrinth',
					version: 'internal',
					method: 'GET',
				})
				.catch((err) => handleError(err, null, '/_internal/globals')),
		])

		const tremendousIdMap = Object.fromEntries(
			(payoutMethods as Labrinth.State.PayoutMethodInfo[])
				.filter((m) => m.type === 'tremendous')
				.map((m) => [m.id, { name: m.name, image_url: m.image_logo_url }]),
		)

		return {
			categories,
			loaders,
			gameVersions,
			donationPlatforms,
			reportTypes,
			products,
			homePageProjects: [],
			homePageSearch: {} as Labrinth.Search.v2.SearchResults,
			homePageNotifs: {} as Labrinth.Search.v2.SearchResults,
			tremendousIdMap,
			countries: iso3166Data.countries,
			subdivisions: iso3166Data.subdivisions,
			taxComplianceThresholds: globals?.tax_compliance_thresholds ?? {},
			errors,
		}
	}
}
