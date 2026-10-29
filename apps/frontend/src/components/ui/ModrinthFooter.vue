<script setup lang="ts">
import { DiscordIcon, GithubIcon, ToggleRightIcon } from '@modrinth/assets'
import { Button, ButtonLink } from '@modrinth/ui'
import {
	AutoLink,
	defineMessage,
	defineMessages,
	injectNotificationManager,
	IntlFormatted,
	type MessageDescriptor,
	useVIntl,
} from '@modrinth/ui'
import { commonSettingsMessages } from '@modrinth/ui/src/utils/common-messages.js'

import TextLogo from '~/components/brand/TextLogo.vue'

const flags = useFeatureFlags()
const { formatMessage } = useVIntl()
const { addNotification } = injectNotificationManager()
const config = useRuntimeConfig()

const messages = defineMessages({
	siteInformation: {
		id: 'layout.footer.site-information',
		defaultMessage: 'Vanilla Tyme information',
	},
	openSource: {
		id: 'layout.footer.open-source',
		defaultMessage: 'Website is <github-link>open source</github-link>.',
	},
	copyright: {
		id: 'layout.footer.copyright',
		defaultMessage: '© {year} Vanilla Tyme.',
	},
	basedOnModrinth: {
		id: 'layout.footer.based-on-modrinth',
		defaultMessage: 'Based on original work © 2020-{year} Rinth, Inc., licensed under AGPL v3.',
	},
	legalDisclaimer: {
		id: 'layout.footer.legal-disclaimer',
		defaultMessage:
			'NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.',
	},
	basedOnLabel: {
		id: 'layout.footer.based-on-label',
		defaultMessage: 'Based on',
	},
	unknownCommit: {
		id: 'layout.footer.unknown-commit',
		defaultMessage: 'unknown',
	},
	developerModeActivatedTitle: {
		id: 'layout.footer.developer-mode-activated.title',
		defaultMessage: 'Developer mode activated',
	},
	developerModeActivatedText: {
		id: 'layout.footer.developer-mode-activated.text',
		defaultMessage: 'Developer mode has been enabled',
	},
	developerModeDeactivatedTitle: {
		id: 'layout.footer.developer-mode-deactivated.title',
		defaultMessage: 'Developer mode deactivated',
	},
	developerModeDeactivatedText: {
		id: 'layout.footer.developer-mode-deactivated.text',
		defaultMessage: 'Developer mode has been disabled',
	},
})

const socialLinks: {
	label: MessageDescriptor
	href: string
	icon: Component
	rel?: string
}[] = [
	{
		label: defineMessage({ id: 'layout.footer.social.discord', defaultMessage: 'Discord' }),
		href: 'https://discord.vanillatymeservers.com',
		icon: DiscordIcon,
	},
	{
		label: defineMessage({ id: 'layout.footer.social.github', defaultMessage: 'GitHub' }),
		href: 'https://github.com/VanillaTymeServers',
		icon: GithubIcon,
	},
]

const footerLinks: {
	label: MessageDescriptor
	links: {
		href: string
		label: MessageDescriptor
	}[]
}[] = [
	{
		label: defineMessage({ id: 'layout.footer.about', defaultMessage: 'About' }),
		links: [
			{
				href: '/news',
				label: defineMessage({ id: 'layout.footer.about.news', defaultMessage: 'News' }),
			},
			{
				href: '/news/changelog',
				label: defineMessage({ id: 'layout.footer.about.changelog', defaultMessage: 'Changelog' }),
			},
		],
	},
	{
		label: defineMessage({ id: 'layout.footer.server', defaultMessage: 'Server' }),
		links: [
			{
				href: '/rules',
				label: defineMessage({ id: 'layout.footer.server.rules', defaultMessage: 'Rules' }),
			},
			{
				href: '/vote',
				label: defineMessage({ id: 'layout.footer.server.vote', defaultMessage: 'Vote' }),
			},
			{
				href: '/downloads',
				label: defineMessage({
					id: 'layout.footer.server.map-downloads',
					defaultMessage: 'Map Downloads',
				}),
			},
			{
				href: '/store',
				label: defineMessage({ id: 'layout.footer.server.store', defaultMessage: 'Store' }),
			},
		],
	},
	{
		label: defineMessage({ id: 'layout.footer.shops', defaultMessage: 'Shops' }),
		links: [
			{
				href: '/discover/shops',
				label: defineMessage({
					id: 'layout.footer.shops.browse',
					defaultMessage: 'Browse shops',
				}),
			},
		],
	},
	{
		label: defineMessage({ id: 'layout.footer.legal', defaultMessage: 'Legal' }),
		links: [
			{
				href: '/legal/rules',
				label: defineMessage({ id: 'layout.footer.legal.rules', defaultMessage: 'Content Rules' }),
			},
			{
				href: '/legal/terms',
				label: defineMessage({
					id: 'layout.footer.legal.terms-of-use',
					defaultMessage: 'Terms of Use',
				}),
			},
			{
				href: '/legal/privacy',
				label: defineMessage({
					id: 'layout.footer.legal.privacy-policy',
					defaultMessage: 'Privacy Policy',
				}),
			},
			{
				href: '/legal/security',
				label: defineMessage({
					id: 'layout.footer.legal.security-notice',
					defaultMessage: 'Security Notice',
				}),
			},
		],
	},
]

const developerModeCounter = ref(0)

const state = useGeneratedState()
const buildYear = computed(() => state.value.buildYear ?? new Date().getFullYear())

function developerModeIncrement() {
	developerModeCounter.value++
	if (developerModeCounter.value >= 5) {
		flags.value.developerMode = !flags.value.developerMode
		developerModeCounter.value = 0
		saveFeatureFlags()
		if (flags.value.developerMode) {
			addNotification({
				title: formatMessage(messages.developerModeActivatedTitle),
				text: formatMessage(messages.developerModeActivatedText),
				type: 'success',
			})
		} else {
			addNotification({
				title: formatMessage(messages.developerModeDeactivatedTitle),
				text: formatMessage(messages.developerModeDeactivatedText),
				type: 'success',
			})
		}
	}
}
</script>

<template>
	<footer class="footer-brand-background border-0 border-t-[1px] border-solid">
		<div class="mx-auto flex max-w-screen-xl flex-col gap-6 p-6 pb-20 sm:px-12 md:py-12">
			<div
				class="grid grid-cols-1 gap-4 text-primary md:grid-cols-[1fr_2fr] lg:grid-cols-[auto_auto_auto_auto_auto]"
			>
				<div
					class="flex flex-col items-center gap-3 md:items-start"
					role="region"
					:aria-label="formatMessage(messages.siteInformation)"
				>
					<div class="flex items-center gap-2">
						<Button
							type="quiet"
							interaction="none"
							aria-label="Vanilla Tyme"
							class="!h-auto !p-0"
							@click="developerModeIncrement()"
						>
							<span class="inline-flex">
								<TextLogo aria-hidden="true" class="text-logo h-6 w-auto text-contrast lg:h-8" />
							</span>
						</Button>
						<ButtonLink
							v-if="flags.developerMode"
							v-tooltip="formatMessage(commonSettingsMessages.featureFlags)"
							type="quiet"
							color="brand"
							to="/settings/flags"
							class="!w-9 !rounded-full !px-0"
						>
							<ToggleRightIcon />
						</ButtonLink>
					</div>
					<div class="flex flex-wrap justify-center gap-px sm:-mx-2">
						<ButtonLink
							v-for="(social, index) in socialLinks"
							:key="`footer-social-${index}`"
							v-tooltip="formatMessage(social.label)"
							type="quiet"
							:href="social.href"
							target="_blank"
							:rel="`noopener${social.rel ? ` ${social.rel}` : ''}`"
							class="!w-9 !rounded-full !px-0"
						>
							<component :is="social.icon" class="h-5 w-5" />
						</ButtonLink>
					</div>
					<div class="mt-auto flex flex-wrap justify-center gap-3 md:flex-col">
						<p class="m-0">
							<IntlFormatted :message-id="messages.openSource">
								<template #github-link="{ children }">
									<a
										href="https://github.com/VanillaTymeServers/code"
										class="text-brand hover:underline"
										target="_blank"
										rel="noopener"
									>
										<component :is="() => children" />
									</a>
								</template>
							</IntlFormatted>
						</p>
						<p class="m-0">{{ formatMessage(messages.copyright, { year: buildYear }) }}</p>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:contents">
					<div
						v-for="group in footerLinks"
						:key="group.label.id"
						class="flex flex-col items-center gap-3 sm:items-start"
					>
						<h3 class="m-0 text-base text-contrast">{{ formatMessage(group.label) }}</h3>
						<template v-for="item in group.links" :key="item.label">
							<nuxt-link
								v-if="item.href.startsWith('/')"
								:to="item.href"
								class="w-fit hover:underline"
							>
								{{ formatMessage(item.label) }}
							</nuxt-link>
							<a
								v-else
								:href="item.href"
								class="w-fit hover:underline"
								target="_blank"
								rel="noopener"
							>
								{{ formatMessage(item.label) }}
							</a>
						</template>
					</div>
				</div>
			</div>
			<p v-if="flags.developerMode" class="m-0 text-sm text-secondary">
				{{ formatMessage(messages.basedOnLabel) }}
				<a
					v-if="config.public.owner && config.public.branch"
					class="hover:underline"
					target="_blank"
					:href="`https://github.com/${config.public.owner}/code/tree/${config.public.branch}`"
				>
					{{ config.public.owner }}/{{ config.public.branch }}
				</a>
				@
				<span v-if="config.public.hash === 'unknown'">{{
					formatMessage(messages.unknownCommit)
				}}</span>
				<AutoLink
					v-else
					class="text-link"
					target="_blank"
					:to="`https://github.com/${config.public.owner}/code/commit/${config.public.hash}`"
				>
					{{ config.public.hash }}
				</AutoLink>
			</p>
			<div
				class="flex flex-col items-center gap-1 text-center text-xs font-medium text-secondary opacity-50"
			>
				<span>{{ formatMessage(messages.basedOnModrinth, { year: buildYear }) }}</span>
				<span>{{ formatMessage(messages.legalDisclaimer) }}</span>
			</div>
		</div>
	</footer>
</template>
<style scoped lang="scss">
.footer-brand-background {
	background: var(--brand-gradient-strong-bg);
	border-color: var(--brand-gradient-border);
}
</style>
