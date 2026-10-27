<template>
	<NewModal
		ref="modal"
		:header="formatMessage(editing ? messages.editTitle : messages.addTitle)"
		max-width="550px"
	>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<span class="text-md font-semibold text-contrast">
					{{ formatMessage(messages.itemLabel) }}
				</span>
				<ShopItemCombobox v-model="item" :placeholder="formatMessage(messages.itemPlaceholder)" />
			</div>

			<div class="flex flex-col gap-2">
				<label for="inventory-custom-name">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.customNameLabel) }}
					</span>
				</label>
				<Input
					id="inventory-custom-name"
					v-model="customName"
					:maxlength="64"
					:placeholder="formatMessage(messages.customNamePlaceholder)"
					autocomplete="off"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label for="inventory-amount">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.amountLabel) }}
					</span>
				</label>
				<Input
					id="inventory-amount"
					v-model="amount"
					type="number"
					:step="1"
					:min="1"
					autocomplete="off"
				/>
				<span class="text-secondary">{{ formatMessage(messages.amountDescription) }}</span>
			</div>

			<div class="flex flex-col gap-2">
				<label for="inventory-price">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.priceLabel) }}
					</span>
				</label>
				<div class="flex gap-2">
					<Input
						id="inventory-price"
						v-model="priceAmount"
						type="number"
						:step="1"
						:min="1"
						wrapper-class="w-28 shrink-0"
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

			<div class="flex flex-col gap-2">
				<label for="inventory-sale-price">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.salePriceLabel) }}
					</span>
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
				<span v-if="!saleValid" class="text-red">{{
					formatMessage(messages.salePriceInvalid)
				}}</span>
			</div>

			<div class="flex flex-col gap-2">
				<label for="inventory-note">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.noteLabel) }}
					</span>
				</label>
				<Input
					id="inventory-note"
					v-model="note"
					:maxlength="256"
					:placeholder="formatMessage(messages.notePlaceholder)"
					autocomplete="off"
				/>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex items-center justify-between gap-4">
					<label for="inventory-in-stock" class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.inStockLabel) }}
					</label>
					<Toggle id="inventory-in-stock" v-model="inStock" />
				</div>
				<div class="flex items-center justify-between gap-4">
					<label for="inventory-popular" class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.popularLabel) }}
					</label>
					<Toggle id="inventory-popular" v-model="popular" />
				</div>
			</div>

			<div class="flex justify-end gap-2.5">
				<Button type="outlined" @click="modal?.hide()">
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
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { SaveIcon, XIcon } from '@modrinth/assets'
import {
	Button,
	commonMessages,
	defineMessages,
	Input,
	NewModal,
	Toggle,
	useVIntl,
} from '@modrinth/ui'

import ShopItemCombobox from '~/components/ui/ShopItemCombobox.vue'

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
		id: 'shop.inventory.modal.custom-name-label',
		defaultMessage: 'Custom name',
	},
	customNamePlaceholder: {
		id: 'shop.inventory.modal.custom-name-placeholder',
		defaultMessage: "Optional, e.g. an anvil-renamed item's name",
	},
	amountLabel: { id: 'shop.inventory.modal.amount-label', defaultMessage: 'Amount' },
	amountDescription: {
		id: 'shop.inventory.modal.amount-description',
		defaultMessage: 'How many of the item the buyer gets per trade.',
	},
	priceLabel: { id: 'shop.inventory.modal.price-label', defaultMessage: 'Price' },
	currencyPlaceholder: {
		id: 'shop.inventory.modal.currency-placeholder',
		defaultMessage: 'Currency item',
	},
	salePriceLabel: { id: 'shop.inventory.modal.sale-price-label', defaultMessage: 'Sale price' },
	salePricePlaceholder: {
		id: 'shop.inventory.modal.sale-price-placeholder',
		defaultMessage: 'Optional, leave empty when not on sale',
	},
	salePriceInvalid: {
		id: 'shop.inventory.modal.sale-price-invalid',
		defaultMessage: 'The sale price must be a whole number lower than the normal price.',
	},
	noteLabel: { id: 'shop.inventory.modal.note-label', defaultMessage: 'Note' },
	notePlaceholder: {
		id: 'shop.inventory.modal.note-placeholder',
		defaultMessage: 'Optional, e.g. "Unbreaking III, Mending"',
	},
	inStockLabel: { id: 'shop.inventory.modal.in-stock-label', defaultMessage: 'In stock' },
	popularLabel: { id: 'shop.inventory.modal.popular-label', defaultMessage: 'Popular' },
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
const inStock = ref(true)
const popular = ref(false)

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
		saleValid.value,
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
	inStock.value = entry?.in_stock ?? true
	popular.value = entry?.popular ?? false
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
		in_stock: inStock.value,
		popular: popular.value,
	})
	modal.value?.hide()
}

defineExpose({ show })
</script>
