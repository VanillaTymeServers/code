<template>
	<Combobox
		v-model="model"
		:options="dropdownOptions"
		:search-options="itemOptions"
		:placeholder="placeholder"
		:search-placeholder="placeholder"
		:disabled="disabled"
		searchable
		sync-with-selection
		select-search-text-on-focus
		show-icon-in-selected
		trigger-type="base"
	/>
</template>

<script setup lang="ts">
import { Combobox, type ComboboxOption, defineMessages, useVIntl } from '@modrinth/ui'
import { h, markRaw } from 'vue'

import { shopItems } from '~/helpers/shop-items'

const props = withDefaults(
	defineProps<{
		placeholder?: string
		disabled?: boolean
		/** Item IDs listed before the user types, e.g. common currencies. */
		suggested?: string[]
	}>(),
	{
		placeholder: undefined,
		disabled: false,
		suggested: () => [],
	},
)

const model = defineModel<string>()

const PREVIEW_LIMIT = 100

const { formatMessage } = useVIntl()

const messages = defineMessages({
	typeToSearch: {
		id: 'shop.item-combobox.type-to-search',
		defaultMessage: 'Type to search all {count} items',
	},
})

function itemIcon(id: string) {
	return markRaw(() =>
		h('img', {
			src: `/items/${id}.png`,
			alt: '',
			loading: 'lazy',
			class: 'size-5 shrink-0 object-contain',
		}),
	)
}

const itemOptions: ComboboxOption<string>[] = shopItems.map(({ id, name }) => ({
	value: id,
	label: name,
	icon: itemIcon(id),
	searchTerms: [id],
}))

const dropdownOptions = computed(() => {
	const suggestedOptions = props.suggested
		.map((id) => itemOptions.find((option) => option.value === id))
		.filter((option) => option !== undefined)
	const otherOptions = itemOptions
		.filter((option) => !props.suggested.includes(option.value))
		.slice(0, PREVIEW_LIMIT)

	return [
		...(suggestedOptions.length > 0 ? [...suggestedOptions, { type: 'divider' as const }] : []),
		...otherOptions,
		{ type: 'divider' as const },
		{
			value: '',
			label: formatMessage(messages.typeToSearch, { count: itemOptions.length }),
			disabled: true,
		},
	]
})
</script>
