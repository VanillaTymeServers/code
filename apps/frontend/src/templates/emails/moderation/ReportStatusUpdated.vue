<script setup lang="ts">
import { Heading, Link as VLink, Text } from '@vue-email/components'

import StyledEmail from '../shared/StyledEmail.vue'
</script>

<template>
	<StyledEmail
		title="Report of '{report.title}' has been updated"
		:manual-links="[
			{ link: 'https://vanillatyme.com/legal/rules', label: 'Community Guidelines' },
			{
				link: 'https://vanillatyme.com/dashboard/report/{report.id}',
				label: 'View report in dashboard',
			},
			{ link: 'https://discord.vanillatymeservers.com', label: 'Discord' },
		]"
	>
		<Heading as="h1" class="mb-2 text-2xl font-bold"
			>Report of '{report.title}' has been updated</Heading
		>

		<Text class="text-base">Hi <span class="no-auto-link">{user.name}</span>,</Text>

		<Text class="text-base"
			>Your report of {report.title} from {report.date} has been updated by our staff team.</Text
		>

		<Text class="text-base">
			You can
			<VLink
				href="https://vanillatyme.com/dashboard/report/{report.id}"
				class="text-green underline"
				>view the full report thread</VLink
			>
			to see the update. If you have more information to add, please reply in the report thread for
			our staff to review.
		</Text>

		<Text class="text-base"
			>Thank you for helping keep Vanilla Tyme safe and welcoming for everyone.</Text
		>
	</StyledEmail>
</template>
