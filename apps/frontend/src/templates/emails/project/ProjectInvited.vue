<script setup lang="ts">
import { Button, Heading, Img, Link as VLink, Section, Text } from '@vue-email/components'

import StyledEmail from '../shared/StyledEmail.vue'
</script>

<template>
	<StyledEmail
		title="You've been invited to a shop"
		:manual-links="[
			{ link: 'https://vanillatyme.com/shop/{project.id}', label: 'Shop page' },
			{ link: 'https://vanillatyme.com/dashboard/notifications', label: 'Notification dashboard' },
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
		<Heading as="h1" class="mb-2 text-2xl font-bold">You've been invited to a shop</Heading>

		<Text class="text-base">Hi <span class="no-auto-link">{user.name}</span>,</Text>

		<Text class="text-base">
			Vanilla Tyme member
			<b
				><VLink href="https://vanillatyme.com/user/{inviter.name}" class="text-green underline">
					{inviter.name}
				</VLink></b
			>
			has invited you to join the shop
			<b>
				<VLink href="https://vanillatyme.com/shop/{project.id}" class="text-green underline">
					{project.name}
				</VLink>
			</b>
			on Vanilla Tyme.
		</Text>

		<Section class="bg-bg-super mb-4 mt-4 rounded-lg border border-divider pb-4 pl-4 pr-4 pt-4">
			<Text class="m-0 text-base">
				As a shop member you may be able to edit shop details, configure settings, and collaborate
				with other members depending on the permissions assigned to you.
			</Text>
		</Section>

		<Button
			href="https://vanillatyme.com/dashboard/notifications"
			target="_blank"
			class="text-accentContrast inline-block rounded-[12px] bg-brand pb-3 pl-4 pr-4 pt-3 text-[14px] font-bold"
		>
			Review invitation
		</Button>

		<Text class="text-base">
			If you were not expecting this invitation you should reject the invitation. If you believe
			this was sent in error or is abusive, please contact support
			<VLink href="https://discord.vanillatymeservers.com" class="text-green underline">
				through the Discord</VLink
			>.
		</Text>
	</StyledEmail>
</template>
