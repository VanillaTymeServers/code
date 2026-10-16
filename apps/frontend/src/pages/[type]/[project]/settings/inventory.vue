<template>
	<div>
		<ShopInventoryEntryModal ref="entryModal" @save="saveEntry" />
		<ConfirmModal
			ref="deleteModal"
			:title="formatMessage(messages.deleteTitle)"
			:description="formatMessage(messages.deleteDescription)"
			:proceed-label="formatMessage(commonMessages.deleteLabel)"
			@proceed="deleteEntry"
		/>
		<section class="universal-card">
			<div class="flex flex-col gap-6">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<div class="text-2xl font-semibold text-contrast">
						{{ formatMessage(messages.heading) }}
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

				<div v-if="inventory.length > 0" class="flex flex-col gap-2">
					<div
						v-for="(entry, index) in inventory"
						:key="index"
						class="flex items-center gap-3 rounded-2xl border border-solid border-surface-4 bg-surface-3 p-3"
						:class="{ 'opacity-60': !entry.in_stock }"
					>
						<img
							:src="itemIcon(entry.item)"
							:alt="itemName(entry.item)"
							loading="lazy"
							class="size-10 shrink-0 object-contain"
						/>
						<div class="flex min-w-0 flex-1 flex-col">
							<span class="truncate font-semibold text-contrast">
								{{ entry.custom_name || itemName(entry.item) }}
							</span>
							<span class="truncate text-sm text-secondary">
								{{
									formatMessage(messages.priceSummary, {
										amount: entry.amount,
										price: entry.sale_price ?? entry.price.amount,
										currency: itemName(entry.price.item),
									})
								}}
							</span>
						</div>
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
					v-else
					type="no-items-cart"
					:heading="formatMessage(messages.emptyHeading)"
					:description="formatMessage(messages.emptyDescription)"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { EditIcon, PlusIcon, TrashIcon } from '@modrinth/assets'
import {
	Button,
	commonMessages,
	ConfirmModal,
	defineMessages,
	EmptyState,
	IconButton,
	injectProjectPageContext,
	useVIntl,
} from '@modrinth/ui'
import { isAdmin } from '@modrinth/utils'
import { getItemName, toItemId } from '@vanillatyme/mc-items'

import ShopInventoryEntryModal from '~/components/ui/ShopInventoryEntryModal.vue'

const MAX_ITEMS = 256

const { formatMessage } = useVIntl()
const { projectV3, currentMember, patchProjectV3 } = injectProjectPageContext()

const messages = defineMessages({
	title: { id: 'project.settings.inventory.title', defaultMessage: 'Inventory' },
	heading: { id: 'project.settings.inventory.heading', defaultMessage: 'Inventory' },
	addButton: { id: 'project.settings.inventory.add-button', defaultMessage: 'Add item' },
	priceSummary: {
		id: 'project.settings.inventory.price-summary',
		defaultMessage: '{amount} for {price} {currency}',
	},
	emptyHeading: {
		id: 'project.settings.inventory.empty.heading',
		defaultMessage: 'No items yet',
	},
	emptyDescription: {
		id: 'project.settings.inventory.empty.description',
		defaultMessage: 'Add the items your shop sells so players know what to bring.',
	},
	deleteTitle: {
		id: 'project.settings.inventory.delete-title',
		defaultMessage: 'Are you sure you want to delete this item?',
	},
	deleteDescription: {
		id: 'project.settings.inventory.delete-description',
		defaultMessage: 'It will be removed from your shop’s inventory.',
	},
})

useProjectSettingsHeadTitle(messages.title)

const entryModal = ref<InstanceType<typeof ShopInventoryEntryModal>>()
const deleteModal = ref<InstanceType<typeof ConfirmModal>>()

const inventory = computed(() => projectV3.value?.shop?.inventory ?? [])
const editingIndex = ref(-1)
const deletingIndex = ref(-1)
const saving = ref(false)

const isAdminUser = computed(() => isAdmin(currentMember.value?.user))
const hasPermission = computed(() => {
	const EDIT_DETAILS = 1 << 2
	return (
		isAdminUser.value || ((currentMember.value?.permissions ?? 0) & EDIT_DETAILS) === EDIT_DETAILS
	)
})

function itemName(id: string) {
	return getItemName(id) ?? id
}

function itemIcon(id: string) {
	return `/items/${toItemId(id)}.png`
}

function openEntry(index: number, event?: MouseEvent) {
	editingIndex.value = index
	entryModal.value?.show(index === -1 ? undefined : inventory.value[index], event)
}

function confirmDelete(index: number, event?: MouseEvent) {
	deletingIndex.value = index
	deleteModal.value?.show(event)
}

async function saveInventory(newInventory: Labrinth.Projects.v3.InventoryEntry[]) {
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

function saveEntry(entry: Labrinth.Projects.v3.InventoryEntry) {
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
</script>
