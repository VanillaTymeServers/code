<template>
	<div>
		<ShopInventoryEntryModal ref="entryModal" @save="saveEntry" />
		<ConfirmModal
			ref="deleteModal"
			:title="formatMessage(messages.deleteTitle)"
			:proceed-label="formatMessage(commonMessages.deleteLabel)"
			@proceed="deleteEntry"
		>
			<div v-if="deletingEntry" class="flex flex-col gap-3">
				<div class="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
					<ShopItemStack :item="deletingEntry.item" :amount="deletingEntry.amount" />
					<div class="flex min-w-0 flex-col">
						<span class="truncate font-bold text-contrast">{{ displayName(deletingEntry) }}</span>
						<span v-if="deletingEntry.custom_name" class="truncate text-sm text-secondary">
							{{ itemName(deletingEntry.item) }}
						</span>
						<span class="truncate text-sm text-secondary">{{ priceSummary(deletingEntry) }}</span>
					</div>
				</div>
				<p class="m-0 text-secondary">{{ formatMessage(messages.deleteDescription) }}</p>
			</div>
		</ConfirmModal>

		<section class="universal-card">
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<div class="flex items-baseline gap-2">
						<span class="text-2xl font-semibold text-contrast">
							{{ formatMessage(messages.heading) }}
						</span>
						<span class="text-sm text-secondary">
							{{ formatMessage(messages.itemCount, { count: inventory.length, max: MAX_ITEMS }) }}
						</span>
					</div>
					<Button
						type="colored"
						color="brand"
						:disabled="!hasPermission || saving || inventory.length >= MAX_ITEMS"
						@click="(event) => openEntry(-1, event)"
					>
						<PlusIcon aria-hidden="true" />
						{{ formatMessage(messages.addButton) }}
					</Button>
				</div>

				<Input
					v-if="inventory.length > 0"
					v-model="search"
					:icon="SearchIcon"
					:placeholder="formatMessage(messages.searchPlaceholder)"
					clearable
					wrapper-class="w-full"
				/>

				<div v-if="visibleRows.length > 0" class="flex flex-col gap-2">
					<div
						v-for="{ entry, index } in visibleRows"
						:key="`${entry.item}-${index}`"
						class="relative flex items-center gap-3 rounded-2xl border border-solid border-surface-4 bg-surface-3 p-3"
						:class="{
							'opacity-30': dragIndex === index,
							'opacity-60': dragIndex !== index && !entry.in_stock,
						}"
						:draggable="canReorder"
						@dragstart="dragIndex = index"
						@dragover.prevent="(event) => updateDrop(index, event)"
						@dragend="clearDrag"
						@drop.prevent="moveEntry"
					>
						<div
							v-if="dragIndex !== -1 && dropIndex === index"
							class="pointer-events-none absolute inset-x-2 z-10 h-0.5 rounded-full bg-brand"
							:class="dropAfter ? '-bottom-[6px]' : '-top-[6px]'"
						/>
						<GripVerticalIcon
							v-if="canReorder"
							v-tooltip="formatMessage(messages.dragHint)"
							class="size-5 shrink-0 cursor-grab text-secondary"
							aria-hidden="true"
						/>
						<ShopItemStack :item="entry.item" :amount="entry.amount" />
						<div class="flex min-w-0 flex-1 flex-col">
							<span class="truncate font-semibold text-contrast">{{ displayName(entry) }}</span>
							<span class="truncate text-sm text-secondary">
								{{ priceSummary(entry) }}
								<span v-if="!entry.in_stock">· {{ formatMessage(messages.outOfStock) }}</span>
								<span v-else-if="entry.sale_price" class="text-red">
									· {{ formatMessage(messages.sale) }}
								</span>
							</span>
						</div>
						<span v-if="entry.popular" class="shrink-0 text-sm font-semibold text-green">
							{{ formatMessage(messages.popular) }}
						</span>
						<Toggle
							v-tooltip="formatMessage(messages.inStock)"
							:model-value="entry.in_stock"
							:disabled="!hasPermission || saving"
							@update:model-value="(value) => setInStock(index, value)"
						/>
						<div class="flex shrink-0 gap-2">
							<IconButton
								:label="formatMessage(commonMessages.editButton)"
								type="outlined"
								:disabled="!hasPermission || saving"
								@click="(event) => openEntry(index, event)"
							>
								<EditIcon aria-hidden="true" />
							</IconButton>
							<IconButton
								:label="formatMessage(commonMessages.deleteLabel)"
								type="outlined"
								:disabled="!hasPermission || saving"
								@click="(event) => confirmDelete(index, event)"
							>
								<TrashIcon aria-hidden="true" />
							</IconButton>
						</div>
					</div>
				</div>

				<EmptyState
					v-else-if="inventory.length === 0"
					type="no-items-cart"
					:heading="formatMessage(messages.emptyHeading)"
					:description="formatMessage(messages.emptyDescription)"
				/>
				<EmptyState
					v-else
					type="no-items-cart"
					:heading="formatMessage(messages.noResultsHeading)"
					:description="formatMessage(messages.noResultsDescription)"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { EditIcon, GripVerticalIcon, PlusIcon, SearchIcon, TrashIcon } from '@modrinth/assets'
import {
	Button,
	commonMessages,
	ConfirmModal,
	defineMessages,
	EmptyState,
	IconButton,
	injectProjectPageContext,
	Input,
	Toggle,
	useVIntl,
} from '@modrinth/ui'
import { isAdmin } from '@modrinth/utils'
import { getItemName } from '@vanillatyme/mc-items'

import ShopInventoryEntryModal from '~/components/ui/ShopInventoryEntryModal.vue'
import ShopItemStack from '~/components/ui/ShopItemStack.vue'

type InventoryEntry = Labrinth.Projects.v3.InventoryEntry

const MAX_ITEMS = 256

const { formatMessage } = useVIntl()
const { projectV3, currentMember, patchProjectV3 } = injectProjectPageContext()

const messages = defineMessages({
	title: { id: 'project.settings.inventory.title', defaultMessage: 'Inventory' },
	heading: { id: 'project.settings.inventory.heading', defaultMessage: 'Inventory' },
	addButton: { id: 'project.settings.inventory.add-button', defaultMessage: 'Add item' },
	itemCount: {
		id: 'project.settings.inventory.item-count',
		defaultMessage: '{count} of {max} items',
	},
	searchPlaceholder: {
		id: 'project.settings.inventory.search-placeholder',
		defaultMessage: 'Search your items',
	},
	dragHint: { id: 'project.settings.inventory.drag-hint', defaultMessage: 'Drag to reorder' },
	popular: { id: 'project.settings.inventory.popular', defaultMessage: 'Popular' },
	inStock: { id: 'project.settings.inventory.in-stock', defaultMessage: 'In stock' },
	sale: { id: 'project.settings.inventory.sale', defaultMessage: 'Sale' },
	outOfStock: { id: 'project.settings.inventory.out-of-stock', defaultMessage: 'Out of stock' },
	priceSummary: {
		id: 'project.settings.inventory.trade-summary',
		defaultMessage: '{price} {currency} for {amount}',
	},
	emptyHeading: {
		id: 'project.settings.inventory.empty.heading',
		defaultMessage: 'No items yet',
	},
	emptyDescription: {
		id: 'project.settings.inventory.empty.description',
		defaultMessage: 'Add the items your shop sells so players know what to bring.',
	},
	noResultsHeading: {
		id: 'project.settings.inventory.no-results.heading',
		defaultMessage: 'No matching items',
	},
	noResultsDescription: {
		id: 'project.settings.inventory.no-results.description',
		defaultMessage: 'Try a different search.',
	},
	deleteTitle: {
		id: 'project.settings.inventory.delete-item-title',
		defaultMessage: 'Delete this item?',
	},
	deleteDescription: {
		id: 'project.settings.inventory.delete-item-description',
		defaultMessage: "This can't be undone.",
	},
})

useProjectSettingsHeadTitle(messages.title)

const entryModal = ref<InstanceType<typeof ShopInventoryEntryModal>>()
const deleteModal = ref<InstanceType<typeof ConfirmModal>>()

const inventory = computed(() => projectV3.value?.shop?.inventory ?? [])
const editingIndex = ref(-1)
const deletingIndex = ref(-1)
const dragIndex = ref(-1)
const dropIndex = ref(-1)
const dropAfter = ref(false)
const saving = ref(false)
const search = ref('')

const deletingEntry = computed(() => inventory.value[deletingIndex.value])

const isAdminUser = computed(() => isAdmin(currentMember.value?.user))
const hasPermission = computed(() => {
	const EDIT_DETAILS = 1 << 2
	return (
		isAdminUser.value || ((currentMember.value?.permissions ?? 0) & EDIT_DETAILS) === EDIT_DETAILS
	)
})

const canReorder = computed(() => hasPermission.value && !saving.value && !search.value.trim())

const visibleRows = computed(() => {
	const query = search.value.trim().toLowerCase()
	return inventory.value
		.map((entry, index) => ({ entry, index }))
		.filter(
			({ entry }) =>
				!query ||
				[displayName(entry), itemName(entry.item)].some((name) =>
					name.toLowerCase().includes(query),
				),
		)
})

function itemName(id: string) {
	return getItemName(id) ?? id
}

function displayName(entry: InventoryEntry) {
	return entry.custom_name || itemName(entry.item)
}

function priceSummary(entry: InventoryEntry) {
	return formatMessage(messages.priceSummary, {
		amount: entry.amount,
		price: entry.sale_price ?? entry.price.amount,
		currency: itemName(entry.price.item),
	})
}

function openEntry(index: number, event?: MouseEvent) {
	editingIndex.value = index
	entryModal.value?.show(index === -1 ? undefined : inventory.value[index], event)
}

function confirmDelete(index: number, event?: MouseEvent) {
	deletingIndex.value = index
	deleteModal.value?.show(event)
}

async function saveInventory(newInventory: InventoryEntry[]) {
	if (saving.value) return
	saving.value = true
	try {
		await patchProjectV3({ shop: { inventory: newInventory } }, false, true)
	} catch {
		// patchProjectV3 already shows an error notification
	} finally {
		saving.value = false
	}
}

function saveEntry(entry: InventoryEntry) {
	const newInventory = [...inventory.value]
	if (editingIndex.value === -1) {
		newInventory.push(entry)
	} else {
		newInventory[editingIndex.value] = entry
	}
	saveInventory(newInventory)
}

function deleteEntry() {
	saveInventory(inventory.value.filter((_, index) => index !== deletingIndex.value))
}

function setInStock(index: number, inStock: boolean) {
	saveInventory(
		inventory.value.map((entry, entryIndex) =>
			entryIndex === index ? { ...entry, in_stock: inStock } : entry,
		),
	)
}

function updateDrop(index: number, event: DragEvent) {
	const row = (event.currentTarget as HTMLElement).getBoundingClientRect()
	dropIndex.value = index
	dropAfter.value = event.clientY > row.top + row.height / 2
}

function clearDrag() {
	dragIndex.value = -1
	dropIndex.value = -1
	dropAfter.value = false
}

function moveEntry() {
	const from = dragIndex.value
	let target = dropIndex.value + (dropAfter.value ? 1 : 0)
	clearDrag()
	if (from === -1) return
	if (from < target) target -= 1
	if (from === target) return

	const newInventory = [...inventory.value]
	const [moved] = newInventory.splice(from, 1)
	newInventory.splice(target, 0, moved)
	saveInventory(newInventory)
}
</script>
