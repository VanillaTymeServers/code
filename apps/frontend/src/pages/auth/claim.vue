<template>
	<div
		class="universal-card flex w-full max-w-[27rem] flex-col gap-6 border border-solid border-surface-5 !p-6"
	>
		<template v-if="claim">
			<div class="flex flex-col items-center gap-3 text-center">
				<Avatar :src="claim.avatar_url ?? undefined" :alt="claim.username" size="64px" />
				<h1 class="m-0 text-xl font-semibold text-contrast">
					{{ formatMessage(messages.welcome, { username: claim.username }) }}
				</h1>
				<p class="m-0 text-secondary">{{ formatMessage(messages.description) }}</p>
			</div>

			<div class="flex flex-col gap-2.5">
				<label class="text-md font-semibold text-contrast" for="email">
					{{ formatMessage(commonMessages.emailLabel) }}
				</label>
				<Input
					id="email"
					v-model="email"
					:icon="MailIcon"
					type="email"
					autocomplete="email"
					:placeholder="formatMessage(commonMessages.emailLabel)"
					wrapper-class="w-full"
				/>
			</div>

			<div class="flex flex-col gap-2.5">
				<label class="text-md font-semibold text-contrast" for="password">
					{{ formatMessage(commonMessages.passwordLabel) }}
				</label>
				<Input
					id="password"
					v-model="password"
					:icon="KeyIcon"
					type="password"
					autocomplete="new-password"
					:placeholder="formatMessage(commonMessages.passwordLabel)"
					wrapper-class="w-full"
				/>
				<label for="confirm-password" hidden>
					{{ formatMessage(messages.confirmPasswordLabel) }}
				</label>
				<Input
					id="confirm-password"
					v-model="confirmPassword"
					:icon="KeyIcon"
					type="password"
					autocomplete="new-password"
					:placeholder="formatMessage(messages.confirmPasswordLabel)"
					wrapper-class="w-full"
				/>
				<span v-if="passwordMismatch" class="text-red">
					{{ formatMessage(messages.passwordMismatch) }}
				</span>
			</div>

			<Button
				type="colored"
				color="brand"
				class="!w-full"
				:disabled="!canSubmit || submitting"
				@click="claimAccount"
			>
				<UserPlusIcon aria-hidden="true" />
				{{ formatMessage(messages.createAccount) }}
			</Button>
		</template>

		<template v-else-if="problem">
			<h1 class="m-0 text-center text-xl font-semibold text-contrast">
				{{ formatMessage(messages.linkProblemTitle) }}
			</h1>
			<Admonition type="warning">{{ problem }}</Admonition>
			<ButtonLink type="outlined" class="!w-full" to="/auth/sign-in">
				{{ formatMessage(messages.signIn) }}
			</ButtonLink>
		</template>
	</div>
</template>

<script setup lang="ts">
import { KeyIcon, MailIcon, UserPlusIcon } from '@modrinth/assets'
import {
	Admonition,
	Avatar,
	Button,
	ButtonLink,
	commonMessages,
	defineMessages,
	injectModrinthClient,
	injectNotificationManager,
	Input,
	useVIntl,
} from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'

interface ApiErrorShape {
	data?: {
		description?: string
	}
}

const getErrorMessage = (error: unknown): string => {
	const apiError = error as ApiErrorShape
	if (typeof apiError?.data?.description === 'string') {
		return apiError.data.description
	}
	if (error instanceof Error) {
		return error.message
	}
	return String(error)
}

const client = injectModrinthClient()
const { addNotification } = injectNotificationManager()
const { formatMessage } = useVIntl()
const route = useNativeRoute()

const messages = defineMessages({
	title: {
		id: 'auth.claim.title',
		defaultMessage: 'Finish your account',
	},
	welcome: {
		id: 'auth.claim.welcome',
		defaultMessage: 'Welcome, {username}!',
	},
	description: {
		id: 'auth.claim.description',
		defaultMessage: 'Add your email and choose a password to finish setting up your account.',
	},
	confirmPasswordLabel: {
		id: 'auth.claim.confirm-password-label',
		defaultMessage: 'Confirm password',
	},
	passwordMismatch: {
		id: 'auth.claim.password-mismatch',
		defaultMessage: "The passwords don't match.",
	},
	createAccount: {
		id: 'auth.claim.create-account',
		defaultMessage: 'Create account',
	},
	linkProblemTitle: {
		id: 'auth.claim.link-problem-title',
		defaultMessage: "This link can't be used",
	},
	signIn: {
		id: 'auth.claim.sign-in',
		defaultMessage: 'Sign in',
	},
	missingFlow: {
		id: 'auth.claim.missing-flow',
		defaultMessage: 'This link is incomplete. Run /register in-game to get a new one.',
	},
})

useHead({
	title: () => formatMessage(messages.title),
})

const flow = computed(() => {
	const value = route.query.flow
	return typeof value === 'string' ? value : ''
})

const {
	data: claim,
	error: claimError,
	suspense,
} = useQuery({
	queryKey: computed(() => ['vt', 'claim', flow.value]),
	queryFn: () => client.labrinth.vt_internal.getClaim(flow.value),
	enabled: computed(() => !!flow.value),
	retry: false,
})
onServerPrefetch(suspense)

const problem = computed(() => {
	if (!flow.value) return formatMessage(messages.missingFlow)
	if (claimError.value) return getErrorMessage(claimError.value)
	return null
})

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const submitting = ref(false)

const passwordMismatch = computed(
	() => confirmPassword.value.length > 0 && password.value !== confirmPassword.value,
)
const canSubmit = computed(
	() =>
		email.value.trim().length > 0 &&
		password.value.length > 0 &&
		password.value === confirmPassword.value,
)

async function claimAccount() {
	if (!claim.value || !canSubmit.value || submitting.value) return
	submitting.value = true
	startLoading()
	try {
		const res = await client.labrinth.vt_internal.claim({
			flow: flow.value,
			email: email.value.trim(),
			password: password.value,
		})

		await useAuth(res.session)
		await useUser()
		await navigateTo(`/user/${claim.value.username}`)
	} catch (err) {
		addNotification({
			title: formatMessage(commonMessages.errorNotificationTitle),
			text: getErrorMessage(err),
			type: 'error',
		})
	}
	stopLoading()
	submitting.value = false
}
</script>
