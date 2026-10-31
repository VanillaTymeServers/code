<template>
	<EmptyState
		v-if="!auth.user.value"
		type="empty"
		class="[&>div:last-child]:!mt-6"
		:heading="formatMessage(messages.signInRequiredTitle)"
		:description="formatMessage(messages.signInRequiredDescription)"
	>
		<template #actions>
			<Button type="colored" color="brand" size="xl" native-type="button" @click="requestSignIn">
				<LogInIcon aria-hidden="true" />
				{{ formatMessage(commonMessages.signInButton) }}
			</Button>
		</template>
	</EmptyState>

	<div v-else class="flex flex-col gap-4">
		<p class="m-0 text-secondary" :class="{ 'order-last': disclaimerPosition === 'bottom' }">
			<IntlFormatted :message-id="messages.description">
				<template #profile-link="{ children }">
					<RouterLink v-slot="{ href, navigate }" :to="profilePath" custom>
						<a :href="href" class="text-link" @click="handleProfileLinkClick($event, navigate)">
							<component :is="() => children" />
						</a>
					</RouterLink>
				</template>
			</IntlFormatted>
		</p>

		<hr
			v-if="disclaimerPosition === 'top'"
			class="m-0 h-px w-full border-none bg-divider"
			aria-hidden="true"
		/>

		<section class="flex flex-col gap-6">
			<div class="flex flex-col gap-2.5">
				<h2 class="m-0 text-lg font-semibold text-contrast">
					{{ formatMessage(messages.profilePicture) }}
				</h2>
				<div class="flex items-center gap-4">
					<Avatar :src="avatarUrl" size="md" circle :alt="auth.user.value.username" />
				</div>
			</div>

			<div class="flex flex-col gap-2.5">
				<h2 class="m-0 text-lg font-semibold text-contrast">
					{{ formatMessage(commonMessages.usernameLabel) }}
				</h2>
				<div class="flex items-center gap-2">
					<Input
						id="username-field"
						v-model="current.username"
						class="w-full max-w-md"
						:error="current.username.length > 39"
					/>
					<span
						v-if="current.username.length >= 30"
						class="shrink-0 text-secondary"
						:class="{ 'text-red': current.username.length > 39 }"
					>
						{{ current.username.length }}/39
					</span>
				</div>
				<p class="m-0 text-secondary">
					{{ formatMessage(messages.usernameDescription) }}
				</p>
			</div>

			<div class="flex flex-col gap-2.5">
				<h2 class="m-0 text-lg font-semibold text-contrast">
					{{ formatMessage(messages.bioTitle) }}
				</h2>
				<Textarea id="bio-field" v-model="current.bio" :error="current.bio.length > 160" />
				<div class="text-secondary" :class="{ 'text-red': current.bio.length > 160 }">
					{{ current.bio.length }}/160
				</div>
				<p class="m-0 text-secondary">
					{{ formatMessage(messages.bioDescription) }}
				</p>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { LogInIcon } from '@modrinth/assets'
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

import Avatar from '#ui/components/base/Avatar.vue'
import { Button } from '#ui/components/base/buttons'
import EmptyState from '#ui/components/base/EmptyState.vue'
import Input from '#ui/components/base/inputs/Input.vue'
import Textarea from '#ui/components/base/inputs/Textarea.vue'
import IntlFormatted from '#ui/components/base/IntlFormatted.vue'
import { defineMessages, useVIntl } from '#ui/composables'
import { type AuthUser, injectAuth, injectNotificationManager } from '#ui/providers'
import { commonMessages } from '#ui/utils'

type ProfileFields = {
	username: string
	bio: string
}

const props = withDefaults(
	defineProps<{
		patchUser: (userId: string, patch: Partial<ProfileFields>) => Promise<void>
		changeAvatar: (userId: string, file: Blob, extension: string) => Promise<void>
		deleteAvatar: (userId: string) => Promise<void>
		getAuthenticatedUser: () => Promise<AuthUser>
		disclaimerPosition?: 'top' | 'bottom'
	}>(),
	{
		disclaimerPosition: 'top',
	},
)
const emit = defineEmits<{
	profileLinkClick: [event: MouseEvent]
}>()

const auth = injectAuth()
const notificationManager = injectNotificationManager()
const { formatMessage } = useVIntl()

const activeUserId = ref<string | null>(null)
const original = ref<ProfileFields>({ username: '', bio: '' })
const current = ref<ProfileFields>({ username: '', bio: '' })
const avatarUrl = ref<string | null>(null)
const saving = ref(false)

const profilePath = computed(
	() => `/user/${encodeURIComponent(auth.user.value?.username ?? current.value.username)}`,
)
const originalState = computed(() => ({
	...original.value,
	avatarChanged: false,
}))
const modifiedState = computed(() => ({
	...current.value,
	avatarChanged: false,
}))
const hasChanges = computed(
	() =>
		current.value.username !== original.value.username || current.value.bio !== original.value.bio,
)

watch(
	() => auth.user.value,
	(user) => {
		if (!user || user.id !== activeUserId.value) {
			syncFromUser(user)
		}
	},
	{ immediate: true },
)

function syncFromUser(user: AuthUser | null): void {
	activeUserId.value = user?.id ?? null
	original.value = {
		username: user?.username ?? '',
		bio: user?.bio ?? '',
	}
	current.value = { ...original.value }
	avatarUrl.value = user?.avatar_url ?? null
}

function reset(): void {
	current.value = { ...original.value }
}

async function requestSignIn(): Promise<void> {
	await auth.requestSignIn('')
}

function handleProfileLinkClick(
	event: MouseEvent,
	navigate: (event?: MouseEvent) => unknown,
): void {
	emit('profileLinkClick', event)
	if (!event.defaultPrevented) {
		navigate(event)
	}
}

async function save(): Promise<void> {
	const user = auth.user.value
	if (!user || saving.value) return

	saving.value = true
	try {
		const patch: Partial<ProfileFields> = {}
		if (current.value.username !== original.value.username) {
			patch.username = current.value.username
		}
		if (current.value.bio !== original.value.bio) {
			patch.bio = current.value.bio
		}
		if (Object.keys(patch).length > 0) {
			await props.patchUser(user.id, patch)
		}

		const refreshedUser = await props.getAuthenticatedUser()
		auth.user.value = refreshedUser
		syncFromUser(refreshedUser)
	} catch {
		notificationManager.addNotification({
			type: 'error',
			title: formatMessage(messages.saveError),
			text: formatMessage(messages.saveErrorDescription),
		})
	} finally {
		saving.value = false
	}
}

defineExpose({
	originalState,
	modifiedState,
	saving,
	hasChanges,
	reset,
	save,
})

const messages = defineMessages({
	description: {
		id: 'settings.profile.public-information.description',
		defaultMessage:
			'Your profile information is publicly <profile-link>viewable on Vanilla Tyme</profile-link>.',
	},
	profilePicture: {
		id: 'settings.profile.profile-picture.title',
		defaultMessage: 'Profile picture',
	},
	usernameDescription: {
		id: 'settings.profile.username.description',
		defaultMessage: 'A unique case-insensitive name to identify your profile.',
	},
	bioTitle: {
		id: 'settings.profile.bio.title',
		defaultMessage: 'Bio',
	},
	bioDescription: {
		id: 'settings.profile.bio.description',
		defaultMessage: 'A short description to tell everyone a little bit about you.',
	},
	signInRequiredTitle: {
		id: 'settings.profile.sign-in-required.title',
		defaultMessage: 'Vanilla Tyme account required',
	},
	signInRequiredDescription: {
		id: 'settings.profile.sign-in-required.description',
		defaultMessage: 'Sign in with a Vanilla Tyme account to customize your public profile.',
	},
	saveError: {
		id: 'settings.profile.save-error',
		defaultMessage: 'Failed to update profile',
	},
	saveErrorDescription: {
		id: 'settings.profile.save-error-description',
		defaultMessage: 'An error occurred while updating your profile. Please try again.',
	},
})
</script>
