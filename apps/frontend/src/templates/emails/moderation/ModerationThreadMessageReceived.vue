<script setup lang="ts">
import { Heading, Img, Link as VLink, Section, Text } from '@vue-email/components'

import StyledEmail from '../shared/StyledEmail.vue'
</script>

<template>
	<StyledEmail
		title="New moderation message"
		:manual-links="[
			{ link: 'https://vanillatyme.com/legal/rules', label: 'Community Guidelines' },
			{
				link: 'https://vanillatyme.com/shop/{project.id}/moderation',
				label: 'Your shop\'s moderation thread',
			},
			{ link: 'https://discord.vanillatymeservers.com', label: 'Discord' },
		]"
	>
		<Section class="mb-4 mt-2">
			<Img src="{project.icon_url}" alt="shop icon" width="64" height="64" class="block h-auto" />
		</Section>
		<Heading as="h1" class="mb-2 text-2xl font-bold"
			>New message from moderators on {project.name}</Heading
		>

		<Text class="text-base">Hi <span class="no-auto-link">{user.name}</span>,</Text>

		<Text class="text-base">
			Vanilla Tyme's moderation team has left a message on your shop,
			<VLink
				href="https://vanillatyme.com/shop/{project.id}/moderation"
				class="text-green underline"
				>{project.name}</VLink
			>.
		</Text>

		<Section class="bg-bg-super mb-4 mt-4 rounded-lg border border-divider pb-4 pl-4 pr-4 pt-4">
			<Text class="m-0 text-base">
				Please
				<VLink
					href="https://vanillatyme.com/shop/{project.id}/moderation"
					class="text-green underline"
					>sign in to view the message</VLink
				>
				and reply if requested. It's important to address feedback from the staff team promptly.
			</Text>
		</Section>

		<Text class="text-base">Thank you for publishing on Vanilla Tyme!</Text>
	</StyledEmail>
</template>
