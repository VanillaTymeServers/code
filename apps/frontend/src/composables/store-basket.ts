import { ModrinthApiError,type Tebex } from '@modrinth/api-client'
import { injectModrinthClient } from '@modrinth/ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { storeQueryOptions } from '~/composables/queries/store'

const BASKET_COOKIE_NAME = 'vt-store-basket'

export type AddToBasketInput = {
	packageIdent: string
	giftTo?: string
	type: 'single' | 'subscription'
	username?: string
}

/**
 * The visitor's Tebex basket. Its ident is kept in a cookie so the cart survives reloads, and the
 * basket itself is created on the first add, for the Minecraft username that is buying.
 */
export const useStoreBasket = () => {
	const client = injectModrinthClient()
	const queryClient = useQueryClient()
	const config = useRuntimeConfig()
	const token = config.public.tebexPublicToken as string

	const cookie = useCookie<string | null>(BASKET_COOKIE_NAME, {
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		secure: config.public.cookieSecure,
	})
	const basketIdent = useState<string | null>('store-basket-ident', () => cookie.value ?? null)
	watch(basketIdent, (value) => {
		cookie.value = value
	})

	const basketQuery = useQuery(
		computed(() => storeQueryOptions.basket(token, basketIdent.value ?? '', client)),
	)

	const basket = computed(() => {
		const data = basketQuery.data.value
		return data && !data.complete ? data : null
	})

	watch(
		() => basketQuery.data.value?.complete,
		(complete) => {
			if (complete) basketIdent.value = null
		},
	)
	watch(basketQuery.error, (error) => {
		if (error instanceof ModrinthApiError && [404, 422].includes(error.statusCode ?? 0)) {
			basketIdent.value = null
		}
	})

	function setBasket(data: Tebex.Headless.Basket) {
		basketIdent.value = data.ident
		queryClient.setQueryData(storeQueryOptions.basket(token, data.ident, client).queryKey, data)
	}

	const addMutation = useMutation({
		mutationFn: async ({ packageIdent, type, username, giftTo }: AddToBasketInput) => {
			let ident = basketIdent.value
			if (!ident) {
				if (!username) throw new Error('a minecraft username is needed to start a basket')
				const created = await client.tebex.headless.createBasket(token, {
					username,
					complete_url: `${config.public.siteUrl}/store?purchase=complete`,
					cancel_url: `${config.public.siteUrl}/store`,
				})
				ident = created.ident
			}
			return client.tebex.headless.addPackage(ident, {
				package_id: packageIdent,
				quantity: 1,
				type,
				target_username: giftTo,
			})
		},
		onSuccess: setBasket,
	})

	const removeMutation = useMutation({
		mutationFn: (packageId: number) =>
			client.tebex.headless.removePackage(basketIdent.value!, String(packageId)),
		onSuccess: setBasket,
	})

	function resetBasket() {
		basketIdent.value = null
	}

	return {
		basket,
		isLoading: basketQuery.isLoading,
		addMutation,
		removeMutation,
		resetBasket,
	}
}
