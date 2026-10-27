<template>
	<div class="flex flex-col">
		<template v-for="module in modules ?? []" :key="module.id">
			<div v-if="module.type === 'payment_goal'" class="card flex-card flex flex-col gap-3">
				<h2 class="m-0 text-lg">{{ module.data.header }}</h2>
				<ProgressBar
					:progress="module.data.percentage / 100"
					:striped="module.data.bar_style === 'striped'"
					:animated="module.data.bar_animated"
					full-width
				/>
				<span
					v-if="module.data.total != null && module.data.target != null && webstore"
					class="text-sm text-secondary"
				>
					{{
						formatMessage(messages.goalProgress, {
							raised: price(module.data.total, webstore.currency),
							target: price(module.data.target, webstore.currency),
						})
					}}
				</span>
			</div>
			<div v-else-if="module.type === 'top_customer'" class="card flex-card flex flex-col gap-3">
				<h2 class="m-0 text-lg">{{ module.data.header }}</h2>
				<div class="flex items-center gap-3">
					<Avatar :src="module.data.avatar_url" :alt="module.data.username" size="40px" no-shadow />
					<span class="font-semibold text-contrast">{{ module.data.username }}</span>
				</div>
			</div>
			<div v-else-if="module.type === 'recent_payments'" class="card flex-card flex flex-col gap-3">
				<h2 class="m-0 text-lg">{{ module.data.header }}</h2>
				<div
					v-for="(payment, index) in module.data.payments"
					:key="index"
					class="flex items-center gap-3"
				>
					<Avatar :src="payment.avatar_url" :alt="payment.username" size="32px" no-shadow />
					<div class="flex min-w-0 flex-col leading-tight">
						<span class="truncate font-semibold text-contrast">{{ payment.username }}</span>
						<span class="truncate text-sm text-secondary">
							{{ payment.package.name }}
							<template v-if="payment.created_at">
								·
								<span v-tooltip="formatDateTime(payment.created_at)">
									{{ relativeTime(payment.created_at) }}
								</span>
							</template>
						</span>
					</div>
				</div>
			</div>
			<div v-else-if="module.type === 'featured_package'" class="card flex-card flex flex-col gap-3">
				<h2 class="m-0 text-lg">{{ module.data.header }}</h2>
				<StorePackageCard :pkg="module.data.package" />
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { Avatar, defineMessages, injectModrinthClient, ProgressBar, useRelativeTime, useVIntl, useFormatDateTime } from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'

import StorePackageCard from '~/components/ui/store/StorePackageCard.vue'
import { storeQueryOptions } from '~/composables/queries/store'

const { formatMessage } = useVIntl()
const client = injectModrinthClient()
const token = useStoreToken()
const price = useStorePrice()
const relativeTime = useRelativeTime()
const formatDateTime = useFormatDateTime({
	timeStyle: 'short',
	dateStyle: 'long',
})

const { data: modules, suspense: modulesSuspense } = useQuery(
	storeQueryOptions.sidebar(token, client),
)
const { data: webstore, suspense: webstoreSuspense } = useQuery(
	storeQueryOptions.webstore(token, client),
)

onServerPrefetch(() => Promise.all([modulesSuspense(), webstoreSuspense()]))

const messages = defineMessages({
	goalProgress: {
		id: 'store.sidebar.goal-progress',
		defaultMessage: '{raised} of {target}',
	},
})
</script>
