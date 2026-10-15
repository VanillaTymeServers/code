<template>
	<div class="flex flex-col gap-3">
		<h2 class="m-0 text-lg">{{ formatMessage(messages.title) }}</h2>
		<div
			class="flex flex-col gap-3 [&>div>svg]:mt-[1px] [&>div>svg]:shrink-0 [&>div]:flex [&>div]:items-start [&>div]:gap-2"
		>
			<div>
				<StoreIcon aria-hidden="true" />
				<span>{{ formatMessage(shop.stall ? messages.typeStall : messages.typeShop) }}</span>
			</div>
			<div v-if="shop.stall && shop.stall_color">
				<PaletteIcon aria-hidden="true" />
				<span class="flex items-center gap-2">
					<span
						class="inline-block size-4 rounded border border-solid border-surface-5"
						:style="{ backgroundColor: WOOL_COLORS[shop.stall_color] }"
					/>
					{{ formatMessage(stallColorMessages[shop.stall_color]) }}
				</span>
			</div>
			<div>
				<CalendarIcon aria-hidden="true" />
				<span>{{ formatMessage(messages.season, { season: shop.season }) }}</span>
			</div>
			<div v-if="shop.coordinates">
				<MapPinIcon aria-hidden="true" />
				<span>X {{ shop.coordinates.x }}, Z {{ shop.coordinates.z }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { CalendarIcon, MapPinIcon, PaletteIcon, StoreIcon } from '@modrinth/assets'
import { defineMessages, stallColorMessages, useVIntl, WOOL_COLORS } from '@modrinth/ui'

defineProps<{
	shop: Labrinth.Projects.v3.ShopProject
}>()

const { formatMessage } = useVIntl()

const messages = defineMessages({
	title: {
		id: 'shop.sidebar.title',
		defaultMessage: 'Shop info',
	},
	typeShop: {
		id: 'shop.sidebar.type-shop',
		defaultMessage: 'Shop',
	},
	typeStall: {
		id: 'shop.sidebar.type-stall',
		defaultMessage: 'Stall',
	},
	season: {
		id: 'shop.sidebar.season',
		defaultMessage: 'Season {season}',
	},
})
</script>
