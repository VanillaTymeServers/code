<template>
	<Combobox
		v-model="model"
		:options="suggestedOptions"
		:search-options="itemOptions"
		:placeholder="placeholder"
		:search-placeholder="placeholder"
		:disabled="disabled"
		:min-search-length-to-open="suggested.length > 0 ? 0 : 2"
		searchable
		sync-with-selection
		select-search-text-on-focus
		trigger-type="base"
	/>
</template>

<script setup lang="ts">
import { Combobox, type ComboboxOption } from '@modrinth/ui'
import { items } from '@vanillatyme/mc-items'
import { h, markRaw } from 'vue'

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

function itemIcon(id: string) {
	return markRaw(() =>
		h('img', {
			src: `/items/${id}.png`,
			alt: '',
			loading: 'lazy',
			class: 'size-6 shrink-0 object-contain',
		}),
	)
}

const itemOptions: ComboboxOption<string>[] = Object.entries(items).map(([id, name]) => ({
	value: id,
	label: name,
	icon: itemIcon(id),
	searchTerms: [id],
}))

const suggestedOptions = computed(() =>
	itemOptions.filter((option) => props.suggested.includes(option.value)),
)
</script>
