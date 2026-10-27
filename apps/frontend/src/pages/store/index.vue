<template>
	<div class="flex flex-col gap-6">
		<Admonition
			v-for="sale in sales ?? []"
			:key="sale.id"
			type="success"
			:header="sale.name"
			:body="saleSummary(sale)"
		/>
		<StoreCategorySection
			v-for="category in categories ?? []"
			:key="category.id"
			:category="category"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Tebex } from '@modrinth/api-client'
import {
	Admonition,
	defineMessages,
	injectModrinthClient,
	useFormatDateTime,
	useVIntl,
} from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'

import StoreCategorySection from '~/components/ui/store/StoreCategorySection.vue'
import { storeQueryOptions } from '~/composables/queries/store'

const { formatMessage } = useVIntl()
const client = injectModrinthClient()
const token = useStoreToken()
const price = useStorePrice()
const formatDate = useFormatDateTime({ dateStyle: 'medium' })

const { data: categories, suspense: categoriesSuspense } = useQuery(
	storeQueryOptions.categories(token, client),
)
const { data: sales, suspense: salesSuspense } = useQuery(storeQueryOptions.sales(token, client))

onServerPrefetch(() => Promise.all([categoriesSuspense(), salesSuspense()]))

const messages = defineMessages({
	salePercentage: {
		id: 'store.sale.percentage',
		defaultMessage: '{percentage}% off until {date}',
	},
	saleAmount: {
		id: 'store.sale.amount',
		defaultMessage: '{amount} off until {date}',
	},
	saleCommands: {
		id: 'store.sale.commands',
		defaultMessage: 'Bonus perks until {date}',
	},
})

function saleSummary(sale: Tebex.Headless.Sale) {
	const date = formatDate(sale.ends_at)
	const { discount } = sale
	if (discount.type === 'percentage') {
		return formatMessage(messages.salePercentage, { percentage: discount.percentage, date })
	}
	if (discount.type === 'amount' && discount.amount != null) {
		return formatMessage(messages.saleAmount, {
			amount: price(discount.amount, discount.currency),
			date,
		})
	}
	return formatMessage(messages.saleCommands, { date })
}
</script>
