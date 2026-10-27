<template>
	<div>
		<div v-if="inventory.length > 0" class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			<div
				v-for="(entry, index) in inventory"
				:key="index"
				class="flex gap-4 rounded-2xl border border-solid bg-surface-3 p-4"
				:class="[
					entry.popular ? 'border-green' : 'border-surface-4',
					{ 'opacity-60': !entry.in_stock },
				]"
			>
				<img
					:src="itemIcon(entry.item)"
					:alt="itemName(entry.item)"
					loading="lazy"
					class="size-12 shrink-0 object-contain"
				/>
				<div class="flex min-w-0 flex-1 flex-col gap-2">
					<div class="min-w-0">
						<h2 class="m-0 truncate text-lg font-bold text-contrast">
							{{ entry.custom_name || itemName(entry.item) }}
						</h2>
						<p v-if="entry.custom_name" class="m-0 truncate text-sm text-secondary">
							{{ itemName(entry.item) }}
						</p>
					</div>
					<p v-if="entry.note" class="m-0 text-sm">{{ entry.note }}</p>
					<div
						v-if="entry.popular || entry.sale_price || !entry.in_stock"
						class="flex flex-wrap gap-1"
					>
						<TagItem v-if="entry.popular" :style="{ '--_color': 'var(--color-green)' }">
							<StarIcon aria-hidden="true" />
							{{ formatMessage(messages.popular) }}
						</TagItem>
						<TagItem v-if="entry.sale_price" :style="{ '--_color': 'var(--color-red)' }">
							<TagIcon aria-hidden="true" />
							{{ formatMessage(messages.sale) }}
						</TagItem>
						<TagItem v-if="!entry.in_stock">
							<PackageIcon aria-hidden="true" />
							{{ formatMessage(messages.outOfStock) }}
						</TagItem>
					</div>
					<div class="mt-auto flex flex-wrap items-center gap-1.5">
						<template v-if="entry.sale_price">
							<span class="text-lg font-bold text-red">{{ entry.sale_price }}</span>
							<s class="text-sm text-secondary">{{ entry.price.amount }}</s>
						</template>
						<span v-else class="text-lg font-bold text-contrast">{{ entry.price.amount }}</span>
						<img
							v-tooltip="itemName(entry.price.item)"
							:src="itemIcon(entry.price.item)"
							:alt="itemName(entry.price.item)"
							class="size-6 object-contain"
						/>
						<span class="text-secondary">
							{{ formatMessage(messages.forAmount, { amount: entry.amount }) }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<EmptyState
			v-else
			type="no-items-cart"
			:heading="formatMessage(messages.emptyHeading)"
			:description="formatMessage(messages.emptyDescription)"
		/>
	</div>
</template>

<script setup lang="ts">
import { PackageIcon, StarIcon, TagIcon } from '@modrinth/assets'
import {
	defineMessages,
	EmptyState,
	injectProjectPageContext,
	TagItem,
	useVIntl,
} from '@modrinth/ui'
import { getItemName, toItemId } from '@vanillatyme/mc-items'

const { projectV2: project, projectV3 } = injectProjectPageContext()
const { formatMessage } = useVIntl()

const messages = defineMessages({
	seoTitle: {
		id: 'project.inventory.seo-title',
		defaultMessage: '{title} - Inventory',
	},
	popular: {
		id: 'project.inventory.popular',
		defaultMessage: 'Popular',
	},
	sale: {
		id: 'project.inventory.sale',
		defaultMessage: 'Sale',
	},
	outOfStock: {
		id: 'project.inventory.out-of-stock',
		defaultMessage: 'Out of stock',
	},
	forAmount: {
		id: 'project.inventory.for-amount',
		defaultMessage: 'for {amount}',
	},
	emptyHeading: {
		id: 'project.inventory.empty.heading',
		defaultMessage: 'No items yet',
	},
	emptyDescription: {
		id: 'project.inventory.empty.description',
		defaultMessage: "This shop hasn't listed anything it sells.",
	},
})

const inventory = computed(() => projectV3.value?.shop?.inventory ?? [])

function itemName(id: string) {
	return getItemName(id) ?? id
}

function itemIcon(id: string) {
	return `/items/${toItemId(id)}.png`
}

const title = computed(() => formatMessage(messages.seoTitle, { title: project.value.title }))

useSeoMeta({
	title,
	ogTitle: title,
})
</script>
