import { injectModrinthClient, injectProjectPageContext } from '@modrinth/ui'
import { isStaff } from '@modrinth/utils'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

import { seasonQueryOptions } from '~/composables/queries/season'

/**
 * Whether the current project is a shop from a past season that the viewer can't change.
 * Staff can still change archived shops, matching Labrinth's rule.
 */
export function useShopReadOnly() {
	const { projectV3, currentMember } = injectProjectPageContext()
	const client = injectModrinthClient()
	const { data: seasons } = useQuery(seasonQueryOptions.list(client))

	return computed(() => {
		const shop = projectV3.value?.shop
		const currentSeason = seasons.value?.find((season) => season.current)
		return (
			!!shop &&
			!!currentSeason &&
			shop.season !== currentSeason.id &&
			!isStaff(currentMember.value?.user)
		)
	})
}
