<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { CompassIcon, DownloadIcon, HeartIcon } from '@modrinth/assets'
import { capitalizeString } from '@modrinth/utils'

import { useCompactNumber, useVIntl } from '../../../composables'
import { commonMessages, shopMessages } from '../../../utils'

const { formatMessage } = useVIntl()
const { formatCompactNumber } = useCompactNumber()

defineProps<{
	downloads?: number
	followers?: number
	shop?: Labrinth.Projects.v3.ShopProject | null
}>()
</script>

<template>
	<div
		v-if="shop?.coordinates"
		v-tooltip="formatMessage(shopMessages.coordinatesLabel)"
		class="flex items-center gap-2 trim-text-box smart-clickable:allow-pointer-events"
	>
		<CompassIcon class="size-5 shrink-0" />
		<span class="font-medium">{{ shop.coordinates.x }}, {{ shop.coordinates.z }}</span>
	</div>
	<div
		v-if="downloads !== undefined && !shop"
		v-tooltip="
			capitalizeString(
				formatMessage(commonMessages.projectDownloads, {
					count: downloads,
				}),
			)
		"
		class="flex items-center gap-2 trim-text-box smart-clickable:allow-pointer-events"
	>
		<DownloadIcon class="size-5 shrink-0" />
		<span class="font-medium">
			{{ formatCompactNumber(downloads) }}
		</span>
	</div>
	<div
		v-if="followers !== undefined"
		v-tooltip="
			capitalizeString(
				formatMessage(commonMessages.projectFollowers, {
					count: followers,
				}),
			)
		"
		class="flex items-center gap-2 trim-text-box smart-clickable:allow-pointer-events"
	>
		<HeartIcon class="size-5 shrink-0" />
		<span class="font-medium">
			{{ formatCompactNumber(followers) }}
		</span>
	</div>
</template>
<style scoped>
.trim-text-box {
	text-box-trim: trim-both;
}
</style>
