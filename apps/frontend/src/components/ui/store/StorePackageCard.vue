<template>
	<NuxtLink
		:to="`/store/package/${pkg.id}`"
		class="flex flex-col overflow-hidden rounded-2xl bg-bg-raised text-primary transition-transform hover:scale-[1.02]"
	>
		<img
			v-if="pkg.image"
			:src="pkg.image"
			:alt="pkg.name"
			class="aspect-square w-full bg-surface-2 object-contain p-6"
		/>
		<div class="flex flex-col gap-1 p-4">
			<span class="text-lg font-bold text-contrast">{{ pkg.name }}</span>
			<span class="text-xl font-bold text-brand">{{ price(pkg.total_price, pkg.currency) }}</span>
			<span v-if="pkg.type !== 'single' && pkg.expiry_period" class="text-sm text-secondary">
				{{
					formatMessage(pkg.type === 'both' ? messages.oneTimeOrRecurring : messages.recurring, {
						count: pkg.expiry_period.count,
						unit: pkg.expiry_period.unit,
					})
				}}
			</span>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { Tebex } from '@modrinth/api-client'
import { defineMessages, useVIntl } from '@modrinth/ui'

defineProps<{
	pkg: Tebex.Headless.Package
}>()

const { formatMessage } = useVIntl()
const price = useStorePrice()

const messages = defineMessages({
	recurring: {
		id: 'store.package.recurring',
		defaultMessage: '{count, plural, one {Every {unit}} other {Every # {unit}s}}',
	},
	oneTimeOrRecurring: {
		id: 'store.package.one-time-or-recurring',
		defaultMessage:
			'{count, plural, one {One-time or every {unit}} other {One-time or every # {unit}s}}',
	},
})
</script>
