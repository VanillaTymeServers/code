<template>
	<NewModal
		ref="modal"
		:header="formatMessage(editing ? messages.editTitle : messages.addTitle)"
		max-width="680px"
		scrollable
		:before-hide="confirmClose"
	>
		<div class="flex flex-col gap-4 pb-5">
			<div v-if="item && priceItem" class="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
				<ShopItemStack :item="item" :amount="amount ?? 1" />
				<div class="flex min-w-0 flex-1 flex-col">
					<span class="truncate font-bold text-contrast">
						{{ customName.trim() || itemName(item) }}
					</span>
					<span v-if="note.trim()" class="truncate text-sm text-secondary">{{ note }}</span>
				</div>
				<ShopItemStack
					:item="priceItem"
					:amount="salePrice ?? priceAmount ?? 1"
					:original-amount="salePrice ? priceAmount : undefined"
				/>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div class="flex min-w-0 flex-col gap-2">
					<span class="font-semibold text-contrast">{{ formatMessage(messages.itemLabel) }}</span>
					<ShopItemCombobox v-model="item" :placeholder="formatMessage(messages.itemPlaceholder)" />
				</div>
				<div class="flex min-w-0 flex-col gap-2">
					<label for="inventory-custom-name" class="font-semibold text-contrast">
						{{ formatMessage(messages.customNameLabel) }}
					</label>
					<Input
						id="inventory-custom-name"
						v-model="customName"
						:maxlength="64"
						:placeholder="formatMessage(messages.customNamePlaceholder)"
						autocomplete="off"
					/>
				</div>
				<div class="flex min-w-0 flex-col gap-2">
					<label for="inventory-amount" class="font-semibold text-contrast">
						{{ formatMessage(messages.amountLabel) }}
					</label>
					<Input
						id="inventory-amount"
						v-model="amount"
						type="number"
						:step="1"
						:min="1"
						autocomplete="off"
					/>
				</div>
				<div class="flex min-w-0 flex-col gap-2">
					<label for="inventory-price" class="font-semibold text-contrast">
						{{ formatMessage(messages.priceLabel) }}
					</label>
					<div class="flex gap-2">
						<Input
							id="inventory-price"
							v-model="priceAmount"
							type="number"
							:step="1"
							:min="1"
							wrapper-class="w-24 shrink-0"
							autocomplete="off"
						/>
						<ShopItemCombobox
							v-model="priceItem"
							:suggested="CURRENCIES"
							:placeholder="formatMessage(messages.currencyPlaceholder)"
							class="min-w-0 flex-1"
						/>
					</div>
				</div>
				<div class="flex min-w-0 flex-col gap-2">
					<label for="inventory-sale-price" class="font-semibold text-contrast">
						{{ formatMessage(messages.salePriceLabel) }}
					</label>
					<Input
						id="inventory-sale-price"
						v-model="salePrice"
						type="number"
						:step="1"
						:min="1"
						:placeholder="formatMessage(messages.salePricePlaceholder)"
						autocomplete="off"
					/>
					<span v-if="!saleValid" class="text-sm text-red">
						{{ formatMessage(messages.salePriceInvalid) }}
					</span>
				</div>
				<div class="flex items-end gap-6 pb-2">
					<label class="flex items-center gap-2 font-semibold text-contrast">
						{{ formatMessage(messages.inStockLabel) }}
						<Toggle v-model="inStock" />
					</label>
					<label class="flex items-center gap-2 font-semibold text-contrast">
						{{ formatMessage(messages.popularLabel) }}
						<Toggle v-model="popular" />
					</label>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label for="inventory-note" class="font-semibold text-contrast">
					{{ formatMessage(messages.noteLabel) }}
				</label>
				<Input
					id="inventory-note"
					v-model="note"
					:maxlength="100"
					:placeholder="formatMessage(messages.notePlaceholder)"
					autocomplete="off"
				/>
				<span class="text-sm text-secondary">{{ note.length }} / 100</span>
			</div>
			<div v-if="isContainer" class="flex flex-col gap-2">
				<div class="flex items-center justify-between gap-2">
					<span class="font-semibold text-contrast">
						{{ formatMessage(messages.contentsLabel) }}
						<span class="text-sm font-normal text-secondary">
							{{ formatMessage(messages.contentsUsed, { count: contents.length }) }}
						</span>
					</span>
					<Button type="outlined" @click="(event) => contentsModal?.show(contents, event)">
						{{ formatMessage(messages.editContents) }}
					</Button>
				</div>
				<div class="grid grid-cols-9 gap-1">
					<div
						v-for="slot in 27"
						:key="slot"
						class="relative flex aspect-square items-center justify-center rounded border border-solid border-surface-4 bg-surface-2"
					>
						<template v-if="contents.find((stack) => stack.slot === slot - 1)">
							<img
								:src="`/items/${toItemId(contents.find((stack) => stack.slot === slot - 1)?.item ?? '')}.png`"
								alt=""
								class="size-3/4 object-contain [image-rendering:pixelated]"
							/>
							<span class="absolute bottom-0 right-0.5 text-xs font-bold text-contrast">
								{{ contents.find((stack) => stack.slot === slot - 1)?.amount }}
							</span>
						</template>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<span class="font-semibold text-contrast">
					{{ formatMessage(messages.descriptionLabel) }}
				</span>
				<MarkdownEditor v-model="description" :max-length="1000" :max-height="220" />
			</div>

			<div class="flex justify-end gap-2.5">
				<Button type="outlined" @click="closeWithoutWarning">
					<XIcon aria-hidden="true" />
					{{ formatMessage(commonMessages.cancelButton) }}
				</Button>
				<Button type="colored" color="brand" :disabled="!canSave" @click="save">
					<SaveIcon aria-hidden="true" />
					{{ formatMessage(commonMessages.saveButton) }}
				</Button>
			</div>
		</div>
	</NewModal>
	<ShopContentsModal ref="contentsModal" @save="contents = $event" />
	<ConfirmModal
		ref="discardModal"
		:title="formatMessage(messages.discardTitle)"
		:description="formatMessage(messages.discardDescription)"
		:proceed-label="formatMessage(messages.discardButton)"
		@proceed="closeWithoutWarning"
	/>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { SaveIcon, XIcon } from '@modrinth/assets'
import {
	Button,
	commonMessages,
	ConfirmModal,
	defineMessages,
	Input,
	MarkdownEditor,
	NewModal,
	Toggle,
	useVIntl,
} from '@modrinth/ui'
import { getItemName, toItemId } from '@vanillatyme/mc-items'

import ShopContentsModal from '~/components/ui/ShopContentsModal.vue'
import ShopItemCombobox from '~/components/ui/ShopItemCombobox.vue'
import ShopItemStack from '~/components/ui/ShopItemStack.vue'

const emit = defineEmits<{
	save: [entry: Labrinth.Projects.v3.InventoryEntry]
}>()

const { formatMessage } = useVIntl()

const messages = defineMessages({
	addTitle: { id: 'shop.inventory.modal.add-title', defaultMessage: 'Add item' },
	editTitle: { id: 'shop.inventory.modal.edit-title', defaultMessage: 'Edit item' },
	itemLabel: { id: 'shop.inventory.modal.item-label', defaultMessage: 'Item' },
	itemPlaceholder: {
		id: 'shop.inventory.modal.item-placeholder',
		defaultMessage: 'Search for an item',
	},
	customNameLabel: {
		id: 'shop.inventory.modal.custom-name-label-optional',
		defaultMessage: 'Custom name (optional)',
	},
	customNamePlaceholder: {
		id: 'shop.inventory.modal.custom-name-hint',
		defaultMessage: 'Shown instead of the item name',
	},
	amountLabel: { id: 'shop.inventory.modal.amount-buyer-gets', defaultMessage: 'Buyer gets' },
	priceLabel: { id: 'shop.inventory.modal.price-label', defaultMessage: 'Price' },
	currencyPlaceholder: {
		id: 'shop.inventory.modal.currency-placeholder',
		defaultMessage: 'Currency item',
	},
	salePriceLabel: {
		id: 'shop.inventory.modal.sale-price-label-optional',
		defaultMessage: 'Sale price (optional)',
	},
	salePricePlaceholder: {
		id: 'shop.inventory.modal.sale-price-hint',
		defaultMessage: 'Leave empty when not on sale',
	},
	salePriceInvalid: {
		id: 'shop.inventory.modal.sale-price-invalid',
		defaultMessage: 'The sale price must be a whole number lower than the normal price.',
	},
	contentsLabel: { id: 'shop.inventory.modal.contents-label', defaultMessage: 'Contents' },
	contentsUsed: {
		id: 'shop.inventory.modal.contents-used',
		defaultMessage: '{count} / 27 slots used',
	},
	editContents: { id: 'shop.inventory.modal.edit-contents', defaultMessage: 'Edit contents' },
	noteLabel: {
		id: 'shop.inventory.modal.note-label-short',
		defaultMessage: 'Note (shown on the list)',
	},
	notePlaceholder: {
		id: 'shop.inventory.modal.note-placeholder',
		defaultMessage: 'Optional, e.g. "Unbreaking III, Mending"',
	},
	descriptionLabel: {
		id: 'shop.inventory.modal.description-label',
		defaultMessage: 'Description (shown when opened)',
	},
	inStockLabel: { id: 'shop.inventory.modal.in-stock-label', defaultMessage: 'In stock' },
	popularLabel: { id: 'shop.inventory.modal.popular-label', defaultMessage: 'Popular' },
	discardTitle: {
		id: 'shop.inventory.modal.discard-title',
		defaultMessage: 'Discard your changes?',
	},
	discardDescription: {
		id: 'shop.inventory.modal.discard-description',
		defaultMessage: 'Your changes to this item will be lost.',
	},
	discardButton: { id: 'shop.inventory.modal.discard-button', defaultMessage: 'Discard' },
})

const CURRENCIES = ['diamond', 'diamond_block', 'emerald', 'emerald_block', 'netherite_ingot']

const modal = ref<InstanceType<typeof NewModal>>()

const editing = ref(false)
const item = ref<string>()
const customName = ref('')
const amount = ref<number | undefined>(1)
const priceItem = ref<string>()
const priceAmount = ref<number | undefined>(1)
const salePrice = ref<number | undefined>()
const note = ref('')
const description = ref('')
const contents = ref<Labrinth.Projects.v3.InventoryContent[]>([])
const contentsModal = ref<InstanceType<typeof ShopContentsModal>>()

const isContainer = computed(() => item.value?.endsWith('shulker_box') ?? false)

const inStock = ref(true)
const popular = ref(false)

const discardModal = ref<InstanceType<typeof ConfirmModal>>()
const savedState = ref('')
let skipWarning = false

function currentState() {
	return JSON.stringify([
		item.value,
		customName.value,
		amount.value,
		priceItem.value,
		priceAmount.value,
		salePrice.value,
		note.value,
		description.value,
		contents.value,
		inStock.value,
		popular.value,
	])
}

function confirmClose() {
	if (skipWarning || currentState() === savedState.value) {
		skipWarning = false
		return true
	}
	discardModal.value?.show()
	return false
}

function closeWithoutWarning() {
	skipWarning = true
	modal.value?.hide()
}

function itemName(id: string) {
	return getItemName(id) ?? id
}

function isPositiveWhole(value: number | undefined): value is number {
	return value !== undefined && Number.isInteger(value) && value >= 1
}

const saleValid = computed(
	() =>
		salePrice.value === undefined ||
		(isPositiveWhole(salePrice.value) &&
			isPositiveWhole(priceAmount.value) &&
			salePrice.value < priceAmount.value),
)

const canSave = computed(
	() =>
		!!item.value &&
		!!priceItem.value &&
		isPositiveWhole(amount.value) &&
		isPositiveWhole(priceAmount.value) &&
		saleValid.value &&
		description.value.length <= 1000,
)

function show(entry?: Labrinth.Projects.v3.InventoryEntry, event?: MouseEvent) {
	editing.value = !!entry
	item.value = entry?.item
	customName.value = entry?.custom_name ?? ''
	amount.value = entry?.amount ?? 1
	priceItem.value = entry?.price.item ?? 'diamond'
	priceAmount.value = entry?.price.amount ?? 1
	salePrice.value = entry?.sale_price ?? undefined
	note.value = entry?.note ?? ''
	description.value = entry?.description ?? ''
	contents.value = entry?.contents ?? []
	inStock.value = entry?.in_stock ?? true
	popular.value = entry?.popular ?? false
	savedState.value = currentState()
	modal.value?.show(event)
}

function save() {
	const selectedItem = item.value
	const currency = priceItem.value
	const tradeAmount = amount.value
	const price = priceAmount.value
	if (!selectedItem || !currency || !isPositiveWhole(tradeAmount) || !isPositiveWhole(price)) {
		return
	}
	if (!saleValid.value) return

	emit('save', {
		item: selectedItem,
		custom_name: customName.value.trim() || null,
		amount: tradeAmount,
		price: { item: currency, amount: price },
		sale_price: salePrice.value ?? null,
		note: note.value.trim() || null,
		description: description.value.trim() || null,
		contents: isContainer.value ? contents.value : [],
		in_stock: inStock.value,
		popular: popular.value,
	})
	closeWithoutWarning()
}

defineExpose({ show })
</script>
