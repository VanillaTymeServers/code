<template>
	<div>
		<div class="landing-hero">
			<h1 class="main-header">
				{{ formatMessage(hero.pre) }}
				<span class="main-header-strong">{{ formatMessage(hero.accent) }}</span>
			</h1>
			<h2 class="main-subheader">{{ formatMessage(hero.subtitle) }}</h2>
			<div
				v-if="hero.badge"
				class="relative mt-4 flex h-fit w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-bold outline outline-1 backdrop-blur-lg"
				:class="hero.badge.variant === 'brand' ? 'text-brand' : 'text-orange'"
				:style="{
					background:
						hero.badge.variant === 'brand'
							? 'var(--color-brand-highlight)'
							: 'var(--color-orange-bg)',
				}"
			>
				<component :is="hero.badge.icon" aria-hidden="true" />
				{{ formatMessage(hero.badge.text) }}
			</div>
		</div>
		<div class="new-page sidebar alt-layout sidebar-top rules-layout">
			<div class="normal-page__header mb-4 flex items-center justify-between gap-2">
				<NavTabs
					:links="[
						{
							label: formatMessage(messages.mainTab),
							href: '/rules',
						},
						{
							label: formatMessage(messages.marketTab),
							href: '/rules/market',
						},
						{
							label: formatMessage(messages.discordTab),
							href: '/rules/discord',
						},
					]"
					replace
				/>
				<Button v-if="rulesToolbar.toggleAll" @click="rulesToolbar.toggleAll">
					{{ formatMessage(rulesToolbar.anyOpen ? messages.collapseAll : messages.expandAll) }}
					<component
						:is="rulesToolbar.anyOpen ? ChevronUpIcon : ChevronDownIcon"
						aria-hidden="true"
					/>
				</Button>
			</div>
			<NuxtPage />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ChevronDownIcon, ChevronUpIcon, StoreIcon, TriangleAlertIcon } from '@modrinth/assets'
import { Button, defineMessages, NavTabs, useVIntl } from '@modrinth/ui'

const { formatMessage } = useVIntl()
const route = useRoute()

const messages = defineMessages({
	mainTab: {
		id: 'rules.tab.main',
		defaultMessage: 'Main',
	},
	marketTab: {
		id: 'rules.tab.market',
		defaultMessage: 'Market',
	},
	discordTab: {
		id: 'rules.tab.discord',
		defaultMessage: 'Discord',
	},
	collapseAll: {
		id: 'rules.toolbar.collapse-all',
		defaultMessage: 'Collapse all',
	},
	expandAll: {
		id: 'rules.toolbar.expand-all',
		defaultMessage: 'Expand all',
	},
	mainHeroPre: {
		id: 'rules.hero.main.pre',
		defaultMessage: 'The',
	},
	mainHeroAccent: {
		id: 'rules.hero.main.accent',
		defaultMessage: 'Rules',
	},
	mainHeroSubtitle: {
		id: 'rules.hero.main.subtitle',
		defaultMessage: 'A nine-year-old community runs on trust. These keep it that way.',
	},
	mainHeroBadge: {
		id: 'rules.hero.main.badge',
		defaultMessage: 'Reading these in full is required before applying. We check.',
	},
	marketHeroPre: {
		id: 'rules.hero.market.pre',
		defaultMessage: 'Market',
	},
	marketHeroAccent: {
		id: 'rules.hero.market.accent',
		defaultMessage: 'Rules',
	},
	marketHeroSubtitle: {
		id: 'rules.hero.market.subtitle',
		defaultMessage:
			'Every approved player can buy or sell almost anything in our market area within Spawn.',
	},
	marketHeroBadge: {
		id: 'rules.hero.market.badge',
		defaultMessage: 'Season 10',
	},
	discordHeroPre: {
		id: 'rules.hero.discord.pre',
		defaultMessage: 'Discord',
	},
	discordHeroAccent: {
		id: 'rules.hero.discord.accent',
		defaultMessage: 'Guidelines',
	},
	discordHeroSubtitle: {
		id: 'rules.hero.discord.subtitle',
		defaultMessage:
			'Applies to all channels, usernames, nicknames, avatars, statuses, and emotes across the Vanilla Tyme Discord server.',
	},
})

const rulesToolbar = reactive<{
	toggleAll: (() => void) | null
	anyOpen: boolean
}>({
	toggleAll: null,
	anyOpen: false,
})
provide('rulesToolbar', rulesToolbar)

const heroes = {
	rules: {
		pre: messages.mainHeroPre,
		accent: messages.mainHeroAccent,
		subtitle: messages.mainHeroSubtitle,
		badge: {
			text: messages.mainHeroBadge,
			variant: 'warning',
			icon: TriangleAlertIcon,
		},
	},
	'rules-market': {
		pre: messages.marketHeroPre,
		accent: messages.marketHeroAccent,
		subtitle: messages.marketHeroSubtitle,
		badge: {
			text: messages.marketHeroBadge,
			variant: 'brand',
			icon: StoreIcon,
		},
	},
	'rules-discord': {
		pre: messages.discordHeroPre,
		accent: messages.discordHeroAccent,
		subtitle: messages.discordHeroSubtitle,
		badge: null,
	},
}

const hero = computed(() => heroes[route.name as keyof typeof heroes] ?? heroes.rules)

useSeoMeta({
	title: () => `${formatMessage(hero.value.pre)} ${formatMessage(hero.value.accent)}`,
	description: () => formatMessage(hero.value.subtitle),
	ogTitle: () => `${formatMessage(hero.value.pre)} ${formatMessage(hero.value.accent)}`,
	ogDescription: () => formatMessage(hero.value.subtitle),
})
</script>

<style scoped lang="scss">
.new-page.sidebar-top {
	@media screen and (max-width: 1023.98px) {
		grid-template:
			'header'
			'sidebar'
			'content'
			/ 100%;
	}
}

.landing-hero {
	position: relative;
	padding: 6rem 1rem 4rem 1rem;
	margin-top: -5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	isolation: isolate;

	h2 {
		line-height: 125%;
		margin: 0 0 1.625rem;
		font-weight: 400;
		line-break: loose;
		color: var(--landing-color-subheading);
		max-width: 1096px;
	}

	.main-subheader {
		font-size: 1.625rem;
	}
}

.main-header {
	font-size: 5.25rem;
	font-weight: 600;
	line-height: 100%;
	margin: 1rem 0 2rem;
}

.main-header-strong {
	font-weight: 600;
	background-color: #00bd3c;
	background-image: linear-gradient(180deg, #a7d0ff 0%, var(--color-brand) 60%);
	background-size: 100%;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;
	color: transparent;
}

@media screen and (max-width: 1024px) {
	.main-header {
		font-size: 4rem;
	}

	.landing-hero .main-subheader {
		font-size: 1.25rem;
	}
}

@media screen and (max-width: 746px) {
	.main-header {
		font-size: 3rem;
	}

	.landing-hero .main-subheader {
		font-size: 1.1rem;
	}
}
</style>

<style lang="scss">
.rules-layout .normal-page__content {
	.icon-section {
		--_bg: var(--color-brand-highlight);
		--_size: 2.5rem;
		--_color: var(--color-brand);
		width: var(--_size);
		height: var(--_size);
		border-radius: calc(16 / 96 * var(--_size));
		color: var(--_color);
		background: var(--_bg);
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;

		svg {
			width: 1.25rem;
			height: 1.25rem;
		}
	}

	ul,
	ol {
		@apply marker:text-brand;
	}

	li {
		line-height: 1.65;
	}

	ol {
		color: var(--landing-color-subheading);

		li {
			margin-bottom: 0.5rem;
		}
	}

	.rules-cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 3rem 2rem;
		text-align: center;
		border-radius: 1.25rem;
		border: 1px solid color-mix(in oklch, var(--color-brand) 22%, transparent);
		background: color-mix(in oklch, var(--color-brand) 4%, transparent);

		a {
			text-decoration: none;
		}
	}

	.rules-cta__title {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--landing-color-heading);
	}

	.rules-cta__subtitle {
		margin: 0 0 0.75rem;
		max-width: 30rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--landing-color-subheading);
	}
}
</style>
