<script setup lang="ts">
import { Button, Heading, Img, Link as VLink, Section, Text } from '@vue-email/components'

import StyledEmail from '../shared/StyledEmail.vue'
</script>

<template>
	<StyledEmail
		title="Your shop, {project.name}, status has been updated"
		:manual-links="[
			{ link: 'https://vanillatyme.com/legal/rules', label: 'Content Rules' },
			{
				link: 'https://vanillatyme.com/shop/{project.id}/moderation',
				label: 'Your shop\'s moderation thread',
			},
			{ link: 'https://discord.vanillatymeservers.com', label: 'Discord' },
		]"
	>
		<Section class="mb-4 mt-2">
			<Img
				src="{project.icon_url}"
				alt="shop icon"
				width="64"
				height="64"
				class="block h-auto rounded-lg"
			/>
		</Section>
		<Heading as="h1" class="mb-2 text-2xl font-bold"
			>Your shop, {project.name}, status has been updated</Heading
		>

		<Text class="text-base">Hi <span class="no-auto-link">{user.name}</span>,</Text>

		<Text class="text-base">
			Your shop's status has been changed from <b>{project.oldstatus}</b> to
			<b>{project.newstatus}</b> by the staff team. Please review any messages left in the
			<VLink
				href="https://vanillatyme.com/shop/{project.id}/moderation"
				class="text-green underline"
				>moderation thread</VLink
			>
			which might be relevant to why the status was changed.
		</Text>

		<Button
			href="https://vanillatyme.com/shop/{project.id}"
			target="_blank"
			class="text-accentContrast inline-block rounded-[12px] bg-brand pb-3 pl-4 pr-4 pt-3 text-[14px] font-bold"
		>
			View shop
		</Button>

		<Text class="text-base">
			If you believe this status was applied in error, you can reply in the moderation thread or
			contact support through our
			<VLink href="https://discord.vanillatymeservers.com" class="text-green underline"
				>Discord</VLink
			>.
		</Text>

		<Text class="text-base">Thank you for publishing on Vanilla Tyme!</Text>
	</StyledEmail>
</template>
