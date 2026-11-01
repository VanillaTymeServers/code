<script setup lang="ts">
import { Heading, Link as VLink, Text } from '@vue-email/components'

import StyledEmail from '../shared/StyledEmail.vue'
</script>

<template>
	<StyledEmail
		title="Report of {report.title} has been submitted"
		:manual-links="[
			{ link: 'https://vanillatyme.com/legal/rules', label: 'Community Guidelines' },
			{
				link: 'https://vanillatyme.com/dashboard/report/{newreport.id}',
				label: 'View report in dashboard',
			},
			{ link: 'https://discord.vanillatymeservers.com', label: 'Discord' },
		]"
	>
		<Heading as="h1" class="mb-2 text-2xl font-bold"
			>Report of {report.title} has been submitted</Heading
		>

		<Text class="text-base">Hi <span class="no-auto-link">{user.name}</span>,</Text>

		<Text class="text-base">
			We've received your report of {report.title} and our staff team will review it shortly.
		</Text>

		<Text class="text-base">
			Our team takes all reports seriously and will investigate according to our
			<VLink href="https://vanillatyme.com/legal/rules" class="text-green underline"
				>Content Rules</VLink
			>, <VLink href="https://vanillatyme.com/legal/terms">Terms of Service</VLink>. You'll receive
			an email update once we've completed our review.
		</Text>

		<Text class="text-base">
			If you have any additional information about this report, you can
			<VLink
				href="https://vanillatyme.com/dashboard/report/{newreport.id}"
				class="text-green underline"
				>view it here</VLink
			>.
		</Text>

		<Text class="text-base">
			Thank you for helping keep Vanilla Tyme safe and welcoming for everyone.
		</Text>
	</StyledEmail>
</template>
