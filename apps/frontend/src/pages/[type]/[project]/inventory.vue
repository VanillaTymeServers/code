<template>
	<div>
		<NewModal ref="itemModal" hide-header max-width="440px">
			<div v-if="selectedEntry" class="flex flex-col gap-4">
				<div class="flex items-center gap-4">
					<div class="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-surface-2">
						<ShopItemStack :item="selectedEntry.item" :amount="selectedEntry.amount" large />
					</div>
					<div class="flex min-w-0 flex-1 flex-col gap-1">
						<span class="truncate text-xl font-bold text-contrast">
							{{ displayName(selectedEntry) }}
						</span>
						<span v-if="selectedEntry.custom_name" class="text-sm text-secondary">
							{{ itemName(selectedEntry.item) }}
						</span>
						<div class="mt-1 flex flex-wrap gap-1.5 text-xs font-semibold">
							<span
								v-if="selectedEntry.popular"
								class="inline-flex items-center gap-1 rounded-full bg-highlight-green px-2.5 py-0.5 text-green"
							>
								<StarIcon class="size-3.5" aria-hidden="true" />
								{{ formatMessage(messages.popular) }}
							</span>
							<span
								v-if="selectedEntry.sale_price"
								class="inline-flex items-center gap-1 rounded-full bg-highlight-red px-2.5 py-0.5 text-red"
							>
								<BadgePercentIcon class="size-3.5" aria-hidden="true" />
								{{ formatMessage(messages.sale) }}
							</span>
							<span
								class="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-0.5 text-secondary"
							>
								<component
									:is="selectedEntry.in_stock ? PackageIcon : PackageOffIcon"
									class="size-3.5"
									aria-hidden="true"
								/>
								{{ formatMessage(selectedEntry.in_stock ? messages.inStock : messages.outOfStock) }}
							</span>
						</div>
					</div>
					<IconButton
						class="shrink-0 self-start"
						type="outlined"
						:label="formatMessage(messages.closeLabel)"
						@click="itemModal?.hide()"
					>
						<XIcon aria-hidden="true" />
					</IconButton>
				</div>

				<div class="flex flex-col gap-2 rounded-2xl bg-surface-2 p-3">
					<span class="text-sm text-secondary">{{ formatMessage(messages.priceLabel) }}</span>
					<div class="flex items-center gap-2">
						<img
							v-tooltip="itemName(selectedEntry.price.item)"
							:src="itemIcon(selectedEntry.price.item)"
							:alt="itemName(selectedEntry.price.item)"
							class="size-8 object-contain [image-rendering:pixelated]"
						/>
						<span
							class="text-xl font-bold"
							:class="selectedEntry.sale_price ? 'text-red' : 'text-contrast'"
						>
							{{ selectedEntry.sale_price ?? selectedEntry.price.amount }}
						</span>
						<s v-if="selectedEntry.sale_price" class="text-secondary">
							{{ selectedEntry.price.amount }}
						</s>
						<span class="text-secondary">{{ itemName(selectedEntry.price.item) }}</span>
						<span class="ml-auto text-secondary">
							{{ formatMessage(messages.forAmount, { amount: selectedEntry.amount }) }}
						</span>
					</div>
				</div>
				<div v-if="selectedEntry.contents?.length" class="flex flex-col gap-1">
					<span class="text-sm text-secondary">{{ formatMessage(messages.contentsLabel) }}</span>
					<div class="grid grid-cols-9 gap-1">
						<div
							v-for="slot in 27"
							:key="slot"
							class="relative flex aspect-square items-center justify-center rounded border border-solid border-surface-4 bg-surface-2"
						>
							<template v-if="stackAt(selectedEntry, slot)">
								<img
									v-tooltip="itemName(stackAt(selectedEntry, slot)?.item ?? '')"
									:src="itemIcon(stackAt(selectedEntry, slot)?.item ?? '')"
									:alt="itemName(stackAt(selectedEntry, slot)?.item ?? '')"
									class="size-6 object-contain [image-rendering:pixelated]"
								/>
								<span class="absolute bottom-0 right-0.5 text-[10px] font-bold text-contrast">
									{{ stackAt(selectedEntry, slot)?.amount }}
								</span>
							</template>
						</div>
					</div>
				</div>
				<div v-if="selectedEntry.note" class="flex flex-col gap-1">
					<span class="text-sm text-secondary">{{ formatMessage(messages.noteLabel) }}</span>
					<p class="m-0 break-words text-contrast">{{ selectedEntry.note }}</p>
				</div>
				<div v-if="selectedEntry.description" class="flex flex-col gap-1">
					<span class="text-sm text-secondary">{{ formatMessage(messages.descriptionLabel) }}</span>
					<div
						class="markdown-body break-words text-contrast"
						v-html="renderHighlightedString(selectedEntry.description)"
					/>
				</div>

				<div
					v-if="coordinates"
					class="flex items-center gap-2 border-0 border-t border-solid border-surface-4 pt-3"
				>
					<CompassIcon class="size-5 text-secondary" aria-hidden="true" />
					<span class="flex-1 text-secondary">X {{ coordinates.x }}, Z {{ coordinates.z }}</span>
					<ButtonLink
						v-tooltip="isCurrentSeason ? undefined : formatMessage(messages.mapUnavailable)"
						type="outlined"
						:href="mapUrl"
						:disabled="!isCurrentSeason"
						target="_blank"
					>
						<EarthSearchIcon aria-hidden="true" />
						{{ formatMessage(messages.openMap) }}
					</ButtonLink>
				</div>
			</div>
		</NewModal>

		<template v-if="inventory.length > 0">
			<div class="mb-3 flex flex-wrap items-center gap-2">
				<div class="min-w-48 flex-1">
					<Input
						v-model="search"
						:icon="SearchIcon"
						:placeholder="formatMessage(messages.searchPlaceholder)"
						clearable
						wrapper-class="w-full"
					/>
				</div>
				<div v-if="currencies.length > 1" class="w-44 shrink-0">
					<Combobox v-model="currency" :options="currencyOptions" />
				</div>
				<div class="w-36 shrink-0">
					<Combobox v-model="sort" :options="sortOptions" />
				</div>
				<IconButton
					:label="formatMessage(messages.changeView)"
					@click="view = view === 'trades' ? 'grid' : 'trades'"
				>
					<GridIcon v-if="view === 'grid'" />
					<ListIcon v-else />
				</IconButton>
			</div>

			<Chips
				v-model="filter"
				:items="filterItems"
				:format-label="filterLabel"
				:capitalize="false"
				size="small"
				class="mb-3"
			/>

			<div v-if="view === 'trades' && visibleItems.length > 0" class="flex flex-col gap-2">
				<button
					v-for="entry in visibleItems"
					:key="entryKey(entry)"
					class="flex w-full items-center gap-3 rounded-2xl border border-solid bg-surface-3 px-4 py-3 text-left transition-colors"
					:class="[
						entry.popular ? 'border-green' : 'border-surface-4 hover:border-surface-5',
						{ 'opacity-60': !entry.in_stock },
					]"
					@click="(event) => openItem(entry, event)"
				>
					<ShopItemStack :item="entry.item" :amount="entry.amount" />
					<span class="ml-1 flex min-w-0 flex-1 flex-col">
						<span class="truncate font-bold text-contrast">{{ displayName(entry) }}</span>
						<span v-if="entry.note" class="truncate text-sm text-secondary">{{ entry.note }}</span>
						<span v-if="entry.contents?.length" class="truncate text-sm text-secondary">
							{{ formatMessage(messages.containsItems, { count: entry.contents.length }) }}
						</span>
					</span>
					<span v-if="!entry.in_stock" class="shrink-0 text-sm text-secondary">
						{{ formatMessage(messages.outOfStock) }}
					</span>
					<template v-else>
						<span v-if="entry.popular" class="shrink-0 text-sm font-semibold text-green">
							{{ formatMessage(messages.popular) }}
						</span>
						<span v-if="entry.sale_price" class="shrink-0 text-sm font-semibold text-red">
							{{ formatMessage(messages.sale) }}
						</span>
					</template>
					<ShopItemStack
						:item="entry.price.item"
						:amount="entry.sale_price ?? entry.price.amount"
						:original-amount="entry.sale_price ? entry.price.amount : undefined"
						class="ml-2"
					/>
				</button>
			</div>

			<div
				v-else-if="view === 'grid' && visibleItems.length > 0"
				class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
			>
				<button
					v-for="entry in visibleItems"
					:key="entryKey(entry)"
					class="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-solid bg-surface-3 p-3 text-center transition-colors"
					:class="[
						entry.popular ? 'border-green' : 'border-surface-4 hover:border-surface-5',
						{ 'opacity-60': !entry.in_stock },
					]"
					@click="(event) => openItem(entry, event)"
				>
					<ShopItemStack :item="entry.item" :amount="entry.amount" large />
					<span class="w-full truncate text-sm font-bold text-contrast">
						{{ displayName(entry) }}
					</span>
					<ShopItemStack
						v-if="entry.in_stock"
						:item="entry.price.item"
						:amount="entry.sale_price ?? entry.price.amount"
						:original-amount="entry.sale_price ? entry.price.amount : undefined"
					/>
					<span v-else class="text-xs text-secondary">
						{{ formatMessage(messages.outOfStock) }}
					</span>
				</button>
			</div>

			<EmptyState
				v-else
				type="no-items-cart"
				:heading="formatMessage(messages.noResultsHeading)"
				:description="formatMessage(messages.noResultsDescription)"
			/>
		</template>

		<EmptyState
			v-else
			type="no-items-cart"
			:heading="formatMessage(messages.emptyHeading)"
			:description="formatMessage(messages.emptyDescription)"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import {
	BadgePercentIcon,
	CompassIcon,
	EarthSearchIcon,
	GridIcon,
	ListIcon,
	PackageIcon,
	PackageOffIcon,
	SearchIcon,
	StarIcon,
	XIcon,
} from '@modrinth/assets'
import {
	ButtonLink,
	Chips,
	Combobox,
	defineMessages,
	EmptyState,
	IconButton,
	injectModrinthClient,
	injectProjectPageContext,
	Input,
	NewModal,
	useVIntl,
} from '@modrinth/ui'
import { renderHighlightedString } from '@modrinth/utils'
import { useQuery } from '@tanstack/vue-query'
import { getItemName, toItemId } from '@vanillatyme/mc-items'
import { useStorage } from '@vueuse/core'

import ShopItemStack from '~/components/ui/ShopItemStack.vue'
import { seasonQueryOptions } from '~/composables/queries/season'
import { LIVE_MAP_URL } from '~/helpers/homepage'

type InventoryEntry = Labrinth.Projects.v3.InventoryEntry
type SortMode = 'popular' | 'name' | 'price'

const { projectV2: project, projectV3 } = injectProjectPageContext()
const { formatMessage } = useVIntl()
const client = injectModrinthClient()

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
	descriptionLabel: {
		id: 'project.inventory.popup.description',
		defaultMessage: 'Description',
	},
	closeLabel: {
		id: 'project.inventory.popup.close',
		defaultMessage: 'Close',
	},
	contentsLabel: {
		id: 'project.inventory.popup.contents',
		defaultMessage: 'Contents',
	},
	containsItems: {
		id: 'project.inventory.contains-items',
		defaultMessage: 'Contains {count, plural, one {# item} other {# items}}',
	},
	noteLabel: {
		id: 'project.inventory.popup.note',
		defaultMessage: 'Note',
	},
	priceLabel: {
		id: 'project.inventory.popup.price',
		defaultMessage: 'Price',
	},
	mapUnavailable: {
		id: 'project.inventory.popup.map-unavailable',
		defaultMessage: "This season's map is no longer available",
	},
	openMap: {
		id: 'project.inventory.popup.open-map',
		defaultMessage: 'Open map',
	},
	inStock: {
		id: 'project.inventory.in-stock',
		defaultMessage: 'In stock',
	},
	outOfStock: {
		id: 'project.inventory.out-of-stock',
		defaultMessage: 'Out of stock',
	},
	forAmount: {
		id: 'project.inventory.for-amount',
		defaultMessage: 'for {amount}',
	},
	searchPlaceholder: {
		id: 'project.inventory.search-placeholder',
		defaultMessage: 'Search items',
	},
	changeView: {
		id: 'project.inventory.change-view',
		defaultMessage: 'Change display mode',
	},
	sortPopular: {
		id: 'project.inventory.sort.featured',
		defaultMessage: 'Featured',
	},
	sortName: {
		id: 'project.inventory.sort.name',
		defaultMessage: 'Name',
	},
	sortPrice: {
		id: 'project.inventory.sort.price',
		defaultMessage: 'Price',
	},
	filterAll: {
		id: 'project.inventory.filter.all',
		defaultMessage: 'All',
	},
	allCurrencies: {
		id: 'project.inventory.all-currencies',
		defaultMessage: 'All currencies',
	},
	onSale: {
		id: 'project.inventory.filter.on-sale',
		defaultMessage: 'On sale',
	},
	noResultsHeading: {
		id: 'project.inventory.no-results.heading',
		defaultMessage: 'No matching items',
	},
	noResultsDescription: {
		id: 'project.inventory.no-results.description',
		defaultMessage: 'Try a different search or filter.',
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
const coordinates = computed(() => projectV3.value?.shop?.coordinates)
const mapUrl = computed(() => {
	const shop = projectV3.value?.shop
	if (!shop?.coordinates) return LIVE_MAP_URL
	const { x, z } = shop.coordinates
	return `${LIVE_MAP_URL}/#Season${shop.season}:${x}:64:${z}:150:0:0:0:1:flat`
})

const { data: seasons } = useQuery(seasonQueryOptions.list(client))
const isCurrentSeason = computed(
	() => seasons.value?.find((season) => season.current)?.id === projectV3.value?.shop?.season,
)

const view = useStorage<'trades' | 'grid'>('shop-inventory-view', 'trades', undefined, {
	initOnMounted: true,
})
const search = ref('')
const sort = ref<SortMode>('popular')
const filter = ref('all')
const currency = ref('all')
const selectedEntry = ref<InventoryEntry | null>(null)
const itemModal = ref<InstanceType<typeof NewModal>>()

const currencies = computed(() => [...new Set(inventory.value.map((entry) => entry.price.item))])

const hasSingleCurrency = computed(() => currency.value !== 'all' || currencies.value.length === 1)

watch(hasSingleCurrency, (single) => {
	if (!single && sort.value === 'price') sort.value = 'popular'
})

const sortOptions = computed(() => [
	{ value: 'popular' as const, label: formatMessage(messages.sortPopular) },
	{ value: 'name' as const, label: formatMessage(messages.sortName) },
	...(hasSingleCurrency.value
		? [{ value: 'price' as const, label: formatMessage(messages.sortPrice) }]
		: []),
])

const currencyOptions = computed(() => [
	{ value: 'all', label: formatMessage(messages.allCurrencies) },
	...currencies.value.map((id) => ({ value: id, label: itemName(id) })),
])

const filterItems = ['all', 'stock', 'out', 'sale']

const visibleItems = computed(() => {
	const query = search.value.trim().toLowerCase()

	return inventory.value
		.filter((entry) => {
			if (filter.value === 'stock' && !entry.in_stock) return false
			if (filter.value === 'out' && entry.in_stock) return false
			if (filter.value === 'sale' && !entry.sale_price) return false
			if (currency.value !== 'all' && entry.price.item !== currency.value) return false
			return (
				!query ||
				[
					displayName(entry),
					itemName(entry.item),
					...(entry.contents ?? []).map((slot) => itemName(slot.item)),
				].some((name) => name.toLowerCase().includes(query))
			)
		})
		.sort((a, b) => {
			if (a.in_stock !== b.in_stock) return a.in_stock ? -1 : 1
			if (sort.value === 'name') return displayName(a).localeCompare(displayName(b))
			if (sort.value === 'price') {
				return (a.sale_price ?? a.price.amount) - (b.sale_price ?? b.price.amount)
			}
			return Number(b.popular) - Number(a.popular)
		})
})

function filterLabel(item: string) {
	if (item === 'stock') return formatMessage(messages.inStock)
	if (item === 'out') return formatMessage(messages.outOfStock)
	if (item === 'sale') return formatMessage(messages.onSale)
	return formatMessage(messages.filterAll)
}

function itemName(id: string) {
	return getItemName(id) ?? id
}

function itemIcon(id: string) {
	return `/items/${toItemId(id)}.png`
}

function stackAt(entry: InventoryEntry, slot: number) {
	return entry.contents?.find((stack) => stack.slot === slot - 1)
}

function displayName(entry: InventoryEntry) {
	return entry.custom_name || itemName(entry.item)
}

function entryKey(entry: InventoryEntry) {
	return `${entry.item}-${entry.custom_name ?? ''}-${entry.price.item}-${entry.amount}`
}

function openItem(entry: InventoryEntry, event: MouseEvent) {
	selectedEntry.value = entry
	itemModal.value?.show(event)
}

const title = computed(() => formatMessage(messages.seoTitle, { title: project.value.title }))

useSeoMeta({
	title,
	ogTitle: title,
})
</script>
