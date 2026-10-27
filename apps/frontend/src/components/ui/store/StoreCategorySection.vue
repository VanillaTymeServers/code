<template>
	<section class="flex flex-col gap-3">
		<h2 class="m-0 text-2xl font-bold text-contrast">{{ category.name }}</h2>
		<div
			v-if="category.description"
			class="markdown-body"
			v-html="sanitizeStoreHtml(category.description)"
		/>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
			<StorePackageCard v-for="pkg in category.packages ?? []" :key="pkg.id" :pkg="pkg" />
		</div>
	</section>
</template>

<script setup lang="ts">
import type { Tebex } from '@modrinth/api-client'

import StorePackageCard from '~/components/ui/store/StorePackageCard.vue'

defineProps<{
	category: Tebex.Headless.Category
}>()
</script>
