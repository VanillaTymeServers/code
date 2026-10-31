<template>
	<StoreCategorySection v-if="category" :category="category" />
</template>

<script setup lang="ts">
import { defineMessages, injectModrinthClient, useVIntl } from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'

import StoreCategorySection from '~/components/ui/store/StoreCategorySection.vue'
import { storeQueryOptions } from '~/composables/queries/store'

const { formatMessage } = useVIntl()
const route = useRoute()
const client = injectModrinthClient()

const { data: categories, suspense } = useQuery(
	storeQueryOptions.categories(useStoreToken(), client),
)

const category = computed(() =>
	categories.value?.find((c) => c.slug === route.params.slug || String(c.id) === route.params.slug),
)

const notFound = () =>
	createError({ fatal: true, statusCode: 404, message: formatMessage(messages.categoryNotFound) })

onServerPrefetch(async () => {
	await suspense()
	if (!category.value) throw notFound()
})

watch(category, (value) => {
	if (categories.value && !value) showError(notFound())
})

const messages = defineMessages({
	categoryNotFound: {
		id: 'store.category.not-found',
		defaultMessage: 'Category not found',
	},
})

if (import.meta.client) await suspense().catch(() => {})
</script>
