import { useFormatPrice } from '@modrinth/ui'
import { configuredXss } from '@modrinth/utils'

/** The Tebex webstore's public token, used by every store query. */
export const useStoreToken = () => useRuntimeConfig().public.tebexPublicToken as string

/** Formats a Tebex price, which comes in whole currency units rather than cents. */
export const useStorePrice = () => {
	const formatPrice = useFormatPrice()
	return (amount: number, currency: string) => formatPrice(Math.round(amount * 100), currency, true)
}

/** Cleans HTML written in the Tebex control panel before it is rendered. */
export const sanitizeStoreHtml = (html: string) => configuredXss.process(html)

/** Packages set to "pay what you want" in Tebex. Their price is the minimum the buyer can pay. */
export const PAY_WHAT_YOU_WANT_PACKAGES = new Set([3697513])
