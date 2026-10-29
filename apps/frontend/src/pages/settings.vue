<template>
	<div>
		<NormalPage sidebar="left">
			<template #header>
				<h1 class="m-0 text-3xl font-semibold">
					{{ formatMessage(commonMessages.settingsLabel) }}
				</h1>
			</template>
			<template #sidebar>
				<NavStack
					:items="
						[
							{ type: 'heading', label: formatMessage(messages.display) },
							{
								link: '/settings',
								label: formatMessage(commonSettingsMessages.appearance),
								icon: PaintbrushIcon,
							},
							flags.developerMode
								? {
										link: '/settings/flags',
										label: formatMessage(commonSettingsMessages.featureFlags),
										icon: ToggleRightIcon,
									}
								: null,
							auth.user ? { type: 'heading', label: formatMessage(messages.account) } : null,
							auth.user
								? {
										link: '/settings/profile',
										label: formatMessage(commonSettingsMessages.profile),
										icon: UserIcon,
									}
								: null,
							auth.user
								? {
										link: '/settings/account',
										label: formatMessage(commonSettingsMessages.account),
										icon: ShieldIcon,
									}
								: null,
							auth.user
								? {
										link: '/settings/sessions',
										label: formatMessage(commonSettingsMessages.sessions),
										icon: MonitorSmartphoneIcon,
									}
								: null,
							auth.user ? { type: 'heading', label: formatMessage(messages.developer) } : null,
							auth.user
								? {
										link: '/settings/pats',
										label: formatMessage(commonSettingsMessages.pats),
										icon: KeyIcon,
									}
								: null,
							isStaff(auth.user) ? { type: 'heading', label: 'Staff' } : null,
							isStaff(auth.user)
								? {
										link: '/settings/moderation',
										label: 'Moderation',
										icon: ScaleIcon,
									}
								: null,
						].filter(Boolean)
					"
				/>
			</template>
			<NuxtPage :route="route" />
		</NormalPage>
	</div>
</template>
<script setup>
import {
	KeyIcon,
	MonitorSmartphoneIcon,
	PaintbrushIcon,
	ScaleIcon,
	ShieldIcon,
	ToggleRightIcon,
	UserIcon,
} from '@modrinth/assets'
import {
	commonMessages,
	commonSettingsMessages,
	defineMessages,
	NormalPage,
	useVIntl,
} from '@modrinth/ui'
import { isStaff } from '@modrinth/utils'

import NavStack from '~/components/ui/NavStack.vue'

const { formatMessage } = useVIntl()

const messages = defineMessages({
	display: {
		id: 'settings.sidebar.label.display',
		defaultMessage: 'Display',
	},
	account: {
		id: 'settings.sidebar.label.account',
		defaultMessage: 'Account',
	},
	developer: {
		id: 'settings.sidebar.label.developer',
		defaultMessage: 'Developer',
	},
})

const route = useNativeRoute()
const auth = await useAuth()
const flags = useFeatureFlags()

useFavicon('settings')
useSeoMeta({
	robots: 'noindex',
})
</script>
