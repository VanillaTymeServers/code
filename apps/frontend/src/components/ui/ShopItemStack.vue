<template>
	<span class="relative inline-flex shrink-0">
		<img
			v-tooltip="itemName"
			:src="`/items/${toItemId(item)}.png`"
			:alt="itemName"
			loading="lazy"
			class="object-contain [image-rendering:pixelated]"
			:class="large ? 'size-14' : 'size-10'"
		/>
		<span
			class="absolute -bottom-1 -right-1 flex gap-1 whitespace-nowrap rounded bg-surface-1 px-1 text-xs font-bold"
			:class="originalAmount ? 'text-red' : 'text-contrast'"
		>
			<s v-if="originalAmount" class="font-medium text-secondary">{{ originalAmount }}</s>
			{{ amount }}
		</span>
	</span>
</template>

<script setup lang="ts">
import { getItemName, toItemId } from '@vanillatyme/mc-items'

const props = defineProps<{
	item: string
	amount: number
	large?: boolean
	originalAmount?: number
}>()

const itemName = computed(() => getItemName(props.item) ?? props.item)
</script>
