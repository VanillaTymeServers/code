<template>
	<NewModal
		ref="modal"
		:header="formatMessage(messages.title)"
		max-width="560px"
		:before-hide="confirmClose"
	>
		<div class="flex flex-col gap-4">
			<div class="grid grid-cols-9 gap-1">
				<button
					v-for="(stack, index) in slots"
					:key="index"
					class="relative flex aspect-square items-center justify-center rounded border border-solid bg-surface-2 p-0"
					:class="index === selected ? 'border-brand' : 'border-surface-5'"
					:aria-label="formatMessage(messages.slotLabel, { slot: index + 1 })"
					@click="selected = index"
				>
					<template v-if="stack">
						<img
							v-tooltip="itemName(stack.item)"
							:src="`/items/${toItemId(stack.item)}.png`"
							:alt="itemName(stack.item)"
							class="size-3/4 object-contain [image-rendering:pixelated]"
						/>
						<span class="absolute bottom-0 right-0.5 text-xs font-bold text-contrast">
							{{ stack.amount }}
						</span>
					</template>
				</button>
			</div>

			<div class="flex flex-col gap-2 rounded-2xl bg-surface-2 p-3">
				<span class="text-sm text-secondary">
					{{ formatMessage(messages.slotLabel, { slot: selected + 1 }) }}
				</span>
				<div class="flex gap-2">
					<ShopItemCombobox
						v-model="selectedItem"
						:placeholder="formatMessage(messages.itemPlaceholder)"
						class="min-w-0 flex-1"
					/>
					<Input
						v-model="selectedAmount"
						type="number"
						:step="1"
						:min="1"
						:max="MAX_STACK"
						wrapper-class="w-20 shrink-0"
						autocomplete="off"
					/>
				</div>
				<div class="flex gap-2">
					<Button type="outlined" :disabled="!slots[selected]" @click="fillBox">
						{{ formatMessage(messages.fillBox) }}
					</Button>
					<Button type="outlined" :disabled="!slots[selected]" @click="slots[selected] = null">
						{{ formatMessage(messages.clearSlot) }}
					</Button>
				</div>
			</div>

			<div class="flex justify-end gap-2.5">
				<Button type="outlined" @click="closeWithoutWarning">
					{{ formatMessage(commonMessages.cancelButton) }}
				</Button>
				<Button type="colored" color="brand" @click="done">
					{{ formatMessage(messages.done) }}
				</Button>
			</div>
		</div>
	</NewModal>
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
import {
	Button,
	commonMessages,
	ConfirmModal,
	defineMessages,
	Input,
	NewModal,
	useVIntl,
} from '@modrinth/ui'
import { getItemName, toItemId } from '@vanillatyme/mc-items'

import ShopItemCombobox from '~/components/ui/ShopItemCombobox.vue'

type Stack = Labrinth.Projects.v3.InventoryContent

const SLOT_COUNT = 27
const MAX_STACK = 64

const emit = defineEmits<{
	save: [contents: Stack[]]
}>()

const { formatMessage } = useVIntl()

const messages = defineMessages({
	title: { id: 'shop.inventory.contents.title', defaultMessage: 'Edit contents' },
	slotLabel: { id: 'shop.inventory.contents.slot', defaultMessage: 'Slot {slot}' },
	itemPlaceholder: {
		id: 'shop.inventory.contents.item-placeholder',
		defaultMessage: 'Search for an item',
	},
	fillBox: { id: 'shop.inventory.contents.fill-box', defaultMessage: 'Fill box' },
	clearSlot: { id: 'shop.inventory.contents.clear-slot', defaultMessage: 'Clear slot' },
	done: { id: 'shop.inventory.contents.done', defaultMessage: 'Done' },
	discardTitle: {
		id: 'shop.inventory.contents.discard-title',
		defaultMessage: 'Discard your changes?',
	},
	discardDescription: {
		id: 'shop.inventory.contents.discard-description',
		defaultMessage: 'Your changes to these contents will be lost.',
	},
	discardButton: { id: 'shop.inventory.contents.discard-button', defaultMessage: 'Discard' },
})

const modal = ref<InstanceType<typeof NewModal>>()
const slots = ref<(Stack | null)[]>([])
const selected = ref(0)
const discardModal = ref<InstanceType<typeof ConfirmModal>>()
const savedState = ref('')
let skipWarning = false

function currentState() {
	return JSON.stringify(slots.value)
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

const selectedItem = computed({
	get: () => slots.value[selected.value]?.item,
	set: (item) => {
		slots.value[selected.value] = item
			? { slot: selected.value, item, amount: slots.value[selected.value]?.amount ?? MAX_STACK }
			: null
	},
})

const selectedAmount = computed({
	get: () => slots.value[selected.value]?.amount,
	set: (amount) => {
		const stack = slots.value[selected.value]
		if (stack && amount) stack.amount = Math.min(Math.max(Math.round(amount), 1), MAX_STACK)
	},
})

function itemName(id: string) {
	return getItemName(id) ?? id
}

function fillBox() {
	const source = slots.value[selected.value]
	if (!source) return
	slots.value = slots.value.map((stack, slot) => stack ?? { ...source, slot })
}

function show(contents: Stack[], event?: MouseEvent) {
	slots.value = Array.from(
		{ length: SLOT_COUNT },
		(_, slot) => contents.find((stack) => stack.slot === slot) ?? null,
	).map((stack) => (stack ? { ...stack } : null))
	selected.value = 0
	savedState.value = currentState()
	modal.value?.show(event)
}

function done() {
	emit(
		'save',
		slots.value.filter((stack): stack is Stack => stack !== null),
	)
	closeWithoutWarning()
}

defineExpose({ show })
</script>
