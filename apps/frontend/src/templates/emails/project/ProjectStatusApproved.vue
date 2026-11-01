<script setup lang="ts">
import { Button, Heading, Img, Link as VLink, Section, Text } from '@vue-email/components'

import StyledEmail from '../shared/StyledEmail.vue'
</script>

<template>
	<StyledEmail
		title="Your shop, {project.name}, has been approved 🎉"
		:manual-links="[
			{ link: 'https://vanillatyme.com/shop/{project.id}', label: 'Shop page' },
			{ link: 'https://vanillatyme.com/legal/rules', label: 'Content Rules' },
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
			>Your shop, {project.name}, has been approved 🎉</Heading
		>

		<Text class="text-base">Congratulations <span class="no-auto-link">{user.name}</span>,</Text>

		<Text class="text-base">
			Your shop
			<VLink href="https://vanillatyme.com/shop/{project.id}" class="text-green underline"
				>{project.name}</VLink
			>
			has been <b>approved</b> by the staff team!
		</Text>

		<Button
			href="https://vanillatyme.com/shop/{project.id}"
			target="_blank"
			class="text-accentContrast inline-block rounded-[12px] bg-brand pb-3 pl-4 pr-4 pt-3 text-[14px] font-bold"
		>
			View shop
		</Button>

		<Text class="text-base">
			If you have questions or believe something isn't correct, you can reach out via the
			<VLink href="https://discord.vanillatymeservers.com" class="text-green underline"
				>Discord</VLink
			>.
		</Text>

		<Text class="text-base">Thank you for sharing your work with the Vanilla Tyme community!</Text>
	</StyledEmail>
</template>
