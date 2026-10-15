<template>
	<Admonition type="info" :header="formatMessage(messages.header, { title, season })">
		<template #icon="{ iconClass }">
			<ArchiveIcon :class="iconClass" />
		</template>
		{{ formatMessage(messages.body, { season }) }}
	</Admonition>
</template>

<script setup lang="ts">
import { ArchiveIcon } from '@modrinth/assets'
import { Admonition, defineMessages, useVIntl } from '@modrinth/ui'

defineProps<{
	title: string
	season: number
}>()

const { formatMessage } = useVIntl()

const messages = defineMessages({
	header: {
		id: 'shop.archived.header',
		defaultMessage: '{title} is from Season {season}',
	},
	body: {
		id: 'shop.archived.body',
		defaultMessage:
			'This shop was part of Season {season} and is now archived. It may no longer exist on the current map.',
	},
})
</script>
