<template>
	<div
		class="universal-card flex w-full max-w-[27rem] flex-col gap-6 border border-solid border-surface-5 !p-6"
	>
		<h1 class="m-0 text-center text-xl font-semibold text-contrast">
			{{ formatMessage(messages.title) }}
		</h1>
		<p class="m-0 text-center">{{ formatMessage(messages.description) }}</p>
		<div class="flex items-center justify-center rounded-xl bg-surface-3 p-4">
			<code class="text-lg font-semibold text-contrast">/register</code>
		</div>
		<p class="m-0 text-center text-secondary">{{ formatMessage(messages.afterwards) }}</p>
		<ButtonLink type="outlined" class="!w-full" to="/auth/sign-in">
			<LogInIcon aria-hidden="true" />
			{{ formatMessage(messages.signIn) }}
		</ButtonLink>
	</div>
</template>

<script setup lang="ts">
import { LogInIcon } from '@modrinth/assets'
import { ButtonLink, defineMessages, useVIntl } from '@modrinth/ui'

const { formatMessage } = useVIntl()

const messages = defineMessages({
	title: {
		id: 'auth.join.title',
		defaultMessage: 'Create an account',
	},
	description: {
		id: 'auth.join.description',
		defaultMessage:
			'Vanilla Tyme accounts are created from the Minecraft server. Join the server and run:',
	},
	afterwards: {
		id: 'auth.join.afterwards',
		defaultMessage:
			"You'll get a link in chat to add your email and choose a password. Your Discord must be linked first.",
	},
	signIn: {
		id: 'auth.join.sign-in',
		defaultMessage: 'Already have an account? Sign in',
	},
})

useHead({
	title: () => formatMessage(messages.title),
})
</script>
