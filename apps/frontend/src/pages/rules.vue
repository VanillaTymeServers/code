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
		<div class="new-page sidebar alt-layout sidebar-top">
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
					<component :is="rulesToolbar.anyOpen ? ChevronUpIcon : ChevronDownIcon" aria-hidden="true" />
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
</script>

<style scoped lang="scss">
.new-page.sidebar-top {
    @media screen and (max-width: 1023.98px) {
        grid-template:
            "header"
            "sidebar"
            "content"
            / 100%;
    }
}

.landing-hero {
    position: relative;
    background-size: cover;
    padding: 6rem 1rem 4rem 1rem;
    margin-top: -5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    isolation: isolate;

    .main-subheader {
        font-size: 1.625rem;
    }

    h2 {
        line-height: 125%;
        margin: 0 0 1.625rem;
        font-weight: 400;
        line-break: loose;
        color: var(--landing-color-subheading);
        max-width: 1096px;
        mask-image: none;
    }

    .button-group {
        width: fit-content;
        margin: 0 auto;
        justify-content: center;
        mask-image: none;
    }

    img {
        width: 100%;
        max-width: 65rem;
        height: auto;
        mask-image: none;
        z-index: 1;
    }

    .bottom-transition {
        z-index: -1;
    }
}

.main-header {
    font-size: 5.25rem;
    font-weight: 600;
    line-height: 100%;
    margin: 1rem 0 2rem;
}

.subheader {
    font-size: 3.5rem;
    font-weight: 600;
    line-height: 100%;
    margin: 0 auto;
    padding: 0 4rem 4rem;
}

.features {
    position: relative;
    width: 100%;
    background: var(--landing-transition-gradient-end);
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    h3 {
        font-weight: 500;
        font-size: var(--font-size-xl) !important;
    }

    p {
        font-size: var(--font-size-md) !important;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, 1fr);
        max-width: min(100%, 1096px);
        width: min(100%, 1096px);
        gap: 16px;
        margin: 0 auto;
        padding: 1rem;

        .mods {
            grid-column: 1 / 2;
            grid-row: 1 / 3;

            .table {
                margin-bottom: 1rem;
                overflow: hidden;
                max-height: 32rem;
            }

            h3,
            p {
                text-align: center;
            }

            h4 {
                margin: 0;
                color: var(--color-contrast);
            }

            .search-bar {
                width: 100%;
                padding: var(--gap-sm);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border-radius: var(--radius-md);
                border: 1px solid var(--landing-border-color);
                background:
                    linear-gradient(0deg, #3b3f55 0%, #3b3f55 100%),
                    rgba(59, 63, 85, 0.15);
                margin-bottom: 0.5rem;
                white-space: nowrap;
                font-size: var(--font-size-sm);

                .mini-input {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 0.5rem;
                    padding: var(--gap-sm) var(--gap-md);
                    border-radius: var(--radius-sm);
                    background-color: #1e202f;
                    flex-grow: 1;
                    max-width: 12rem;
                }

                h4 {
                    font-weight: normal;
                    margin-left: 0.5rem;
                }
            }

            .row {
                display: grid;
                grid-template-columns: 3rem 2fr 1fr 3.75rem;
                padding: 0 var(--gap-sm);
                gap: 1rem;

                .cell {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: var(--gap-sm) 0;
                    font-size: var(--font-size-sm);

                    .name {
                        color: var(--color-contrast);
                    }

                    .description {
                        font-size: var(--font-size-xs);
                    }

                    &.last {
                        align-items: flex-end;
                    }

                    &.check {
                        align-items: center;
                        flex-direction: row;
                    }
                }
            }

            .header {
                .cell {
                    color: var(--color-base);
                }
            }
        }

        .playing {
            grid-column: 1 / 2;
            grid-row: 4 / 5;
            position: relative;
            min-height: 23rem;

            .minecraft {
                position: absolute;
                bottom: 6rem;
                right: var(--gap-xl);
                height: 13rem;
                mask-image: none;
            }

            .launcher {
                position: absolute;
                z-index: 12;
                top: var(--gap-xl);
                left: var(--gap-xl);
                height: 13rem;
                mask-image: none;
            }

            .text {
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: var(--color-contrast);
                text-align: center;
                padding: var(--gap-xl);
                mask-image: none;
                z-index: 10;
                width: 100%;
            }
        }

        .sharing {
            grid-column: 2 / 3;
            grid-row: 2 / 3;

            .table {
                height: 11rem;
                overflow: hidden;
                margin-bottom: 1rem;
            }

            h3,
            p {
                text-align: center;
            }

            .row {
                display: grid;
                grid-template-columns: 3rem 1fr 2fr;
                padding: 0 var(--gap-sm);
                gap: 1rem;

                .cell {
                    display: flex;
                    align-items: center;
                    padding: var(--gap-sm) 0;

                    .description {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            }

            .header {
                display: flex;
                flex-direction: row;
                gap: 0.25rem;
                padding: var(--gap-sm) var(--gap-sm);
            }

            .export-card {
                position: absolute;
                right: 1rem;
                top: 1.5rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: var(--gap-sm);
                gap: var(--gap-md);
                border-radius: var(--radius-md);
                background:
                    linear-gradient(0deg, #3b3f55 0%, #3b3f55 100%),
                    rgba(59, 63, 85, 0.15);
                border: 1px solid var(--landing-border-color);
                margin-bottom: 1rem;
                width: 20rem;
                font-size: var(--font-size-sm);

                img {
                    width: 4.5rem;
                    height: 4.5rem;
                }

                .info {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.25rem;

                    .exporting {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        gap: 0.5rem;
                        width: 100%;

                        .tag {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 0.25rem;
                            border-radius: var(--radius-sm);
                        }

                        .small-button {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 0.25rem;
                            padding: var(--gap-xs) var(--gap-md);
                            border-radius: var(--radius-lg);
                            border: 1px solid var(--landing-border-color);
                            font-size: var(--font-size-xs);
                        }
                    }

                    .name {
                        font-size: var(--font-size-md);
                        color: var(--color-contrast);
                        margin: 0;
                    }
                }
            }
        }

        .performance {
            grid-column: 1 / 2;
            grid-row: 3 / 4;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 0.5rem;

                h3 {
                    margin: 0;
                    font-size: var(--font-size-lg);
                }
            }

            h3,
            h4,
            p {
                text-align: center;
                margin: 0;
            }

            h4,
            h3 {
                color: var(--color-contrast);
                margin-top: var(--gap-lg) !important;
            }

            h4 {
                font-size: var(--font-size-md);
                font-weight: normal;
            }

            .table {
                height: 10rem;
                overflow: hidden;
            }

            .row {
                display: grid;
                grid-template-columns: 3rem 2fr 1fr 1fr;
                padding: 0 var(--gap-sm);
                gap: 1rem;

                .cell {
                    display: flex;
                    align-items: center;
                    padding: var(--gap-sm) 0;
                    color: var(--color-gray);

                    &.important {
                        color: var(--color-contrast);
                        font-weight: 500;
                    }
                }
            }

            .header {
                font-size: var(--font-size-sm);
                .cell {
                    color: var(--color-base);
                }
            }

            .icon-logo {
                width: 3rem;
                height: 3rem;
                padding: 0.5rem;
                border-radius: var(--radius-sm);
                background-color: var(--color-button-bg);

                &.modrinth {
                    background-color: var(--color-brand) !important;
                    border: 1px solid var(--color-accent-contrast) !important;

                    .icon {
                        width: 2rem;
                        height: 2rem;
                        z-index: 0;

                        :deep(svg) {
                            width: 2rem;
                            height: 2rem;
                        }

                        :deep(path) {
                            fill: var(--color-accent-contrast) !important;
                        }
                    }
                }
            }
        }

        .importing {
            position: relative;
            grid-column: 2 / 3;
            grid-row: 1 / 2;

            .icon-logo {
                position: absolute;
                top: 4rem;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 100%;
            }

            .outer-circle {
                position: absolute;
                top: 4rem;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .circle {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;

                .base-circle {
                    position: absolute;
                    border-radius: 100%;
                    top: 4rem;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: -1;
                    border: 1px solid rgba(#a8b1ddbf, 0.25);
                }

                .first-circle {
                    @extend .base-circle;
                    width: 15rem;
                    height: 15rem;
                    background: radial-gradient(
                        50% 50% at 50% 50%,
                        rgba(5, 206, 69, 0.19) 0%,
                        rgba(15, 19, 49, 0.25) 100%
                    );
                }

                .second-circle {
                    @extend .base-circle;
                    width: 25rem;
                    height: 25rem;
                    opacity: 0.75;
                    background:
                        radial-gradient(
                            50% 50% at 50% 50%,
                            rgba(5, 206, 69, 0.19) 0%,
                            rgba(15, 19, 49, 0.25) 100%
                        ),
                        radial-gradient(
                            50% 50% at 50% 50%,
                            rgba(44, 48, 79, 0.25) 0%,
                            rgba(32, 35, 50, 0.19) 100%
                        );
                }

                .third-circle {
                    @extend .base-circle;
                    width: 35rem;
                    height: 35rem;
                    opacity: 0.5;
                    background: radial-gradient(
                        50% 50% at 50% 50%,
                        rgba(44, 48, 79, 0.25) 0%,
                        rgba(32, 35, 50, 0.19) 100%
                    );
                }
            }

            .inner-circle {
                position: relative;
            }

            .launcher-badge {
                position: absolute;
                background-color: var(--landing-transition-gradient-end);
                width: 3rem;
                height: 3rem;
                padding: 0.5rem;
                border-radius: 100%;
                z-index: 10;
                user-select: none;

                &:hover {
                    cursor: default;
                }

                &.top-left {
                    top: calc(15% - 3rem);
                    left: calc(58% - 11rem);
                }

                &.top-right {
                    top: calc(15% - 3rem);
                    right: calc(58% - 11rem);
                }

                &.bottom-left {
                    bottom: calc(41% + 3rem);
                    left: calc(58% - 11rem);
                }

                &.bottom-right {
                    bottom: calc(41% + 3rem);
                    right: calc(58% - 11rem);
                }

                &.bottom-middle {
                    bottom: calc(22% + 3rem);
                    left: 50%;
                    transform: translateX(-50%);
                }

                &.center {
                    top: calc(50% - 3rem);
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                svg {
                    width: 2rem;
                    height: 2rem;
                }

                img {
                    width: 2rem;
                    height: 2rem;
                }
            }

            .text {
                position: absolute;
                text-align: center;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                width: 100%;
                padding: var(--gap-xl);
            }
        }

        .website {
            grid-column: 2 / 3;
            grid-row: 3 / 5;
            text-align: center;
            padding: 0 !important;

            position: relative;

            .projects-showcase {
                margin: calc(7rem + var(--gap-xl)) 0 var(--gap-xl);
                z-index: 3;
                text-align: left;

                .row {
                    --gap: var(--gap-md);

                    width: 100vw;
                    gap: var(--gap);
                    margin-bottom: var(--gap);
                    display: flex;
                    overflow: hidden;
                    user-select: none;

                    .row__content {
                        flex-shrink: 0;
                        display: flex;
                        min-width: 100%;
                        gap: var(--gap);
                        transform: translateX(-15%);

                        &.offset {
                            transform: translateX(-130%);
                        }
                    }

                    .project {
                        position: relative;
                        display: flex;

                        cursor: pointer;
                        padding: 1rem;
                        gap: 1rem;
                        border-radius: 1rem;
                        border: 1px solid var(--landing-border-color);
                        transition:
                            background 0.5s ease-in-out,
                            transform 0.05s ease-in-out;
                        // Removed due to lag on mobile :(
                        background: var(--landing-blob-gradient);

                        img {
                            height: 3rem;
                        }

                        .project-info {
                            box-sizing: border-box;
                        }

                        .title {
                            color: var(--landing-color-heading);
                            max-width: 13.75rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin: 0;
                            font-weight: 600;
                            font-size: 1.25rem;
                            line-height: 110%;
                            display: block;
                        }

                        .description {
                            width: 13.75rem;

                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;

                            font-weight: 500;
                            font-size: 0.875rem;
                            line-height: 125%;
                            margin: 0.25rem 0 0;
                        }
                    }
                }
            }

            .ellipsis {
                position: absolute;
                top: 2rem;
                left: 50%;
                height: 150%;
                z-index: -1;
                aspect-ratio: 1;
                border-radius: 100%;
                transform: translate(-50%, 2rem);
                background: var(--landing-blob-gradient);
                border: 1px solid var(--landing-border-color);
            }

            .icon-logo {
                position: absolute;
                top: 2rem;
                left: 50%;
                transform: translate(-50%, 0);
                z-index: 4;
            }

            p {
                padding: var(--gap-xl);
                padding-top: 0;
            }
        }

        .feature {
            padding: var(--gap-xl);
            z-index: 1;
            background: radial-gradient(
                50% 50% at 50% 50%,
                rgba(44, 48, 79, 0.35) 0%,
                rgba(32, 35, 50, 0.27) 100%
            );
            box-shadow:
                2px 2px 12px 0px rgba(0, 0, 0, 0.16),
                2px 2px 64px 0px rgba(57, 61, 94, 0.45) inset;
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            max-width: 540px;
            width: 100%;
            overflow: hidden;

            .additional-label {
                width: fit-content;
                padding: 0.5rem 0.75rem;
                margin-bottom: 0.5rem;
                background: var(--landing-blue-label-bg);
                color: var(--landing-blue-label);
                border-radius: 6px;
                font-weight: 700;
                font-size: 1rem;
            }

            h3,
            p {
                margin: 0;
            }

            h3 {
                font-size: var(--font-size-xl);
                color: var(--landing-color-heading);
                margin-bottom: 0.375rem;
            }

            p {
                color: var(--landing-color-subheading);
            }
        }
    }

    .feature-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--gap-lg);
        max-width: 1096px;
        margin: 0 auto;
        padding: calc(var(--gap-xl) * 2) 1rem;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(1, 1fr);

            .point {
                text-align: center;

                .title {
                    justify-content: center;
                }
            }
        }

        .point {
            display: flex;
            flex-direction: column;
            gap: var(--gap-md);
            padding: 1rem 0;

            svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            .title {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            h3 {
                font-size: var(--font-size-lg);
                font-weight: normal;
                color: var(--landing-color-heading);
                margin: 0;
            }

            p {
                color: var(--landing-color-subheading);
                margin: 0;
            }

            a {
                text-decoration: underline;
            }
        }
    }
}

.table {
    display: grid;
    border: 1px solid rgba(#a8b1ddbf, 0.25);
    gap: 0.25rem;
    overflow: hidden;
    font-size: var(--font-size-sm);
    background: rgba(59, 63, 85, 0.15);
    box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.16);

    button {
        &:hover {
            cursor: default !important;
        }
    }

    .first {
        border-top: none !important;
    }

    .row {
        &:not(.header) {
            border-top: 1px solid rgba(#a8b1ddbf, 0.25);
        }
    }
}

.row,
.header,
.table,
.project,
.export-card {
    user-select: none;

    &:hover {
        cursor: default;
    }
}

.footer {
    padding: var(--gap-xl);
    background: var(--color-accent-contrast);
    color: var(--color-contrast);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--gap-xl);
    justify-content: center;
    align-items: center;

    .section-badge {
        background-color: var(--color-brand-highlight);
        color: var(--color-brand);
        border-radius: var(--radius-sm);
        width: min-content;
        padding: var(--gap-lg) var(--gap-xl);
        white-space: nowrap;
    }

    .section-subheader {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--gap-sm);
        font-size: var(--font-size-lg);
        margin: 2rem 0;

        .section-subheader-title {
            font-size: var(--font-size-xl);
            margin: 0;
        }

        .section-subheader-description {
            color: var(--color-base);
            margin: 0;
        }
    }

    .download-section {
        display: grid;
        grid-template-columns: 1fr 1px 1fr 1px 1fr;
        height: 100%;
        gap: var(--gap-lg);
        max-width: 1096px;
        margin: 0 auto;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(1, 1fr);
            max-width: 340px;

            .divider {
                display: none;
            }
        }

        .divider {
            height: 13rem;
            width: 1px;
            background: var(--landing-border-color);
            margin: 0;
        }

        .download-card {
            display: flex;
            flex-direction: column;
            gap: calc(var(--gap-lg) * 2);
            padding: calc(var(--gap-lg) * 2);
            height: min-content;

            .title {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: var(--font-size-2xl);
                gap: var(--gap-sm);
                border-radius: var(--radius-md) var(--radius-md) 0 0;
                color: var(--color-contrast);
            }

            .description {
                display: flex;
                flex-direction: column;
                align-items: center;
                border-top: none;
                font-size: var(--font-size-md);
                color: var(--color-brand);
                gap: var(--gap-sm);

                a {
                    display: flex;
                    align-items: center;
                    gap: var(--gap-sm);
                    justify-content: center;

                    &:hover {
                        cursor: pointer;
                    }

                    span {
                        text-align: left;
                    }
                }
            }

            :deep(.animated-dropdown) {
                color: var(--color-brand);
                width: 16rem;
                white-space: nowrap;

                .selected {
                    border: 1px solid var(--color-brand);
                    background-color: var(--color-accent-contrast);
                }

                .options {
                    border: 1px solid var(--color-brand);
                    border-radius: 0 0 var(--radius-md) var(--radius-md);
                }

                .option {
                    background-color: var(--color-accent-contrast);
                }

                .selected-option {
                    background-color: var(--color-brand);
                }
            }
        }
    }

    .terms {
        margin: var(--gap-xl);
        font-size: var(--font-size-lg);
        color: var(--landing-color-subheading);
        text-align: center;
        line-height: 1.5;

        a {
            text-decoration: underline;
        }
    }
}

.icon-logo {
    background: var(--color-accent-contrast);
    width: 5rem;
    height: 5rem;
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--landing-border-color);
    border-radius: var(--radius-lg);

    .icon {
        margin: auto;
        height: 3.5rem;

        :deep(svg) {
            width: 3.5rem;
            height: 3.5rem;
        }

        :deep(.rotate) {
            animation: none !important;
        }
    }
}

.gradient-border {
    position: relative;
    border-radius: var(--radius-lg);

    &:before {
        content: "";
        position: absolute;
        inset: 0;
        padding: 1px;
        z-index: -1;
        border-radius: 1rem;
        background: var(--landing-border-gradient);

        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
}

.bottom-transition {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30rem;
    background: linear-gradient(
        0deg,
        var(--landing-transition-gradient-end) 0%,
        var(--landing-transition-gradient-start) 100%
    );
}

@media screen and (max-width: 1024px) {
    .feature-grid {
        grid-template-columns: 1fr !important;
        grid-template-rows: repeat(8, 1fr) !important;
        gap: var(--gap-lg);
        margin: 0 auto;
        align-content: center;

        .feature {
            width: 100% !important;
            margin: 0 auto;
        }

        .mods {
            grid-row: 1 / 3 !important;
            grid-column: 1 / 2 !important;
        }

        .importing {
            grid-row: 3 / 4 !important;
            grid-column: 1 / 2 !important;
        }

        .sharing {
            grid-row: 4 / 5 !important;
            grid-column: 1 / 2 !important;
        }

        .performance {
            grid-row: 5 / 6 !important;
            grid-column: 1 / 2 !important;
        }

        .playing {
            grid-row: 6 / 7 !important;
            grid-column: 1 / 2 !important;
        }

        .website {
            grid-row: 7 / 9 !important;
            grid-column: 1 / 2 !important;
        }
    }

    .main-header {
        font-size: 4rem !important;
    }

    .subheader {
        font-size: 1.5rem !important;
    }

    .main-subheader {
        font-size: 1.25rem !important;
    }
}

@media screen and (max-width: 746px) {
    .main-header {
        font-size: 3rem !important;
    }

    .subheader {
        font-size: 1.25rem !important;
    }

    .main-subheader {
        font-size: 1.1rem !important;
    }

    .logo-banner {
        padding: 3rem 1rem 3.75rem 1rem;

        .overlay {
            bottom: 3.5rem;
        }
    }
}

.dark-icon {
    display: block;
}

.light-icon {
    display: none;
}

.light-mode {
    .footer,
    .features {
        background: #f8f7f8;
    }

    .bottom-transition {
        background: linear-gradient(rgba(#f8f7f8, 0) 0%, #f8f7f8 100%);
    }

    .dark-icon {
        display: none;
    }

    .light-icon {
        display: block;
    }

    .feature {
        background: radial-gradient(
            50% 50% at 50% 50%,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.27) 100%
        ) !important;
        box-shadow:
            2px 2px 64px 0px rgba(255, 255, 255, 0.45) inset,
            2px 2px 12px 0px rgba(0, 0, 0, 0.16) !important;
        border: none !important;
    }

    .gradient-border {
        &:before {
            background: var(--landing-border-gradient-light);
        }
    }

    .search-bar {
        background: var(--color-raised-bg) !important;
        border: 2px solid var(--color-brand) !important;

        .mini-input {
            background: var(--color-raised-bg) !important;
            border: 2px solid var(--color-bg);
        }
    }

    .ellipsis {
        opacity: 0.75;
        background: linear-gradient(
            180deg,
            rgba(5, 206, 69, 0.15) 0%,
            rgba(5, 206, 69, 0) 100%
        ) !important;
    }

    .base-circle {
        border: 1px solid rgba(#a8b1ddbf, 0.25) !important;
    }

    .first-circle {
        background: linear-gradient(
            180deg,
            rgba(5, 206, 69, 0.15) 0%,
            rgba(5, 206, 69, 0) 100%
        ) !important;
    }

    .second-circle {
        background: linear-gradient(
            180deg,
            rgba(5, 206, 69, 0.15) 0%,
            rgba(5, 206, 69, 0) 100%
        ) !important;
    }

    .third-circle {
        background: linear-gradient(
            180deg,
            rgba(5, 206, 69, 0.15) 0%,
            rgba(5, 206, 69, 0) 100%
        ) !important;
    }

    .table {
        background: white;
    }

    .project {
        background: rgba(255, 255, 255, 0.8) !important;
    }

    .export-card {
        background: white !important;
    }
}

.main-header-strong {
    font-weight: 600;
    background-color: #00bd3c;
    background-image: linear-gradient(
        180deg,
        #a7d0ff 0%,
        var(--color-brand) 60%
    );
    background-size: 100%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    color: transparent;
}

.logo-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1rem 6.75rem 1rem;
    overflow: hidden;
    width: 100%;
    background-color: var(--color-accent-contrast);

    svg {
        z-index: 2;
        width: auto;
        height: 32rem;
    }

    .overlay {
        z-index: 3;
        position: absolute;
        bottom: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1.5rem;
        white-space: nowrap;
    }
}
</style>
