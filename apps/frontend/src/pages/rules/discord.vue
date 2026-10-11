<template>
	<aside class="normal-page__sidebar">
		<div class="rules-content">
			<NavStack
				:items="[
					{
						type: 'heading',
						label: 'On this page',
					},
					{
						label: 'Scope',
						action: () => scrollToSection('scope'),
					},
					{
						label: 'Respect & Conduct',
						action: () => scrollToSection('respect'),
					},
					{
						label: 'Drama & Disputes',
						action: () => scrollToSection('drama'),
					},
					{
						label: 'Discrimination',
						action: () => scrollToSection('discrimination'),
					},
					{
						label: 'Illegal Activity',
						action: () => scrollToSection('illegal'),
					},
					{
						label: 'Spam & Abuse',
						action: () => scrollToSection('spam'),
					},
					{
						label: 'Harassment & Threats',
						action: () => scrollToSection('harassment'),
					},
					{
						label: 'Advertising',
						action: () => scrollToSection('advertising'),
					},
					{
						label: 'Ban Evasion',
						action: () => scrollToSection('ban-evasion'),
					},
					{
						label: 'Disclaimer',
						action: () => scrollToSection('disclaimer'),
					},
				]"
			/>
		</div>
	</aside>
	<div class="normal-page__content mt-3 lg:mt-0">
		<div class="flex flex-col gap-3">
			<Accordion
				id="scope"
				:ref="accordionRefs.scope"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconWorld />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Scope
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)"
								>These rules apply server-wide</span
							>
						</div>
					</div>
				</template>
				<MessageBanner class="mx-4">
					<strong class="text-brand">Change your nickname to your Minecraft in-game name.</strong>
					This prevents confusion and keeps the community organized.
				</MessageBanner>
				<div class="mx-4">
					These guidelines apply to all usernames, nicknames, avatars, statuses, and emotes used
					within the Vanilla Tyme Discord server.
				</div>
			</Accordion>
			<Accordion
				id="respect"
				:ref="accordionRefs.respect"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconHeart />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Respect & Conduct
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Be thoughtful, civil, and inclusive
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						Everyone has the right to express their opinion — but remain thoughtful and respectful.
						Do not post anything offensive, abusive, or that constitutes hate speech of any kind.
					</li>
					<li>
						Excessive offensive language is prohibited. Cursing is allowed, but keep it tasteful.
					</li>
				</ol>
				<MessageBanner class="mx-4" message-type="alert">
					<strong class="text-orange">Prohibited topics</strong> — heated/hot-button discussions or
					posting images/GIFs of the following is not allowed:
					<div class="topic-tags">
						<span class="topic-tag">Religion</span>
						<span class="topic-tag">Politics</span>
						<span
							v-tooltip="
								'Includes adult themed things, general obscenities or sexually explicit images'
							"
							class="topic-tag"
							>NSFW <IconInfoCircle
						/></span>
						<span class="topic-tag">Gore / Self-harm</span>
						<span class="topic-tag">Open wounds / Blood</span>
						<span class="topic-tag">Any Extremism</span>
						<span class="topic-tag">Animal Cruelty</span>
						<span class="topic-tag">Anti-LGBTQIA+</span>
					</div>
					<span
						>Discussion of these topics will be immediately removed and administrative action will
						be taken against all participants.</span
					>
				</MessageBanner>
			</Accordion>
			<Accordion
				id="drama"
				:ref="accordionRefs.drama"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconMessageReport />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Drama & Disputes
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Handle conflicts privately, not in public channels
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						Be kind and strive to keep negativity and drama out of all server chat channels,
						including in-game.
					</li>
					<li>
						All disputes must be handled privately. If you are caught arguing disrespectfully with
						another person, you may face consequences for inciting drama..
					</li>
					<li>Toxicity and animosity in public chat channels will not be tolerated.</li>
				</ol>
			</Accordion>
			<Accordion
				id="discrimination"
				:ref="accordionRefs.discrimination"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconBan />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Discrimination
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								No "-isms" of any kind
							</span>
						</div>
					</div>
				</template>
				<div class="mx-4">
					<span
						>We do not condone or support any acts of "-isms." If you are found perpetrating any of
						these, you will face administrative action.</span
					>
					<div class="topic-tags">
						<span class="topic-tag">Racism</span>
						<span class="topic-tag">Ableism</span>
						<span class="topic-tag">Sexism</span>
						<span class="topic-tag">Ageism</span>
					</div>
				</div>
			</Accordion>
			<Accordion
				id="illegal"
				:ref="accordionRefs.illegal"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconPrison />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Illegal Activity
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Promotion of illegal acts may result in removal from the platform.
							</span>
						</div>
					</div>
				</template>
				<MessageBanner class="mx-4" message-type="danger">
					<strong class="text-red"
						>Promotion, encouragement, or engagement in any illegal behavior</strong
					>
					is unlawful and prohibited. Topics will be reported to Discord'a Trust & Safety team. You
					may be removed from the platform and potentially reported to local law enforcement.
				</MessageBanner>
			</Accordion>
			<Accordion
				id="spam"
				:ref="accordionRefs.spam"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconBellOff />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Spam & Abuse
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Don't flood channels or abuse mentions
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						Spamming messages, mass-pinging, spam-pinging staff, and abuse of the mentions system is
						prohibited.
					</li>
					<li>
						Abuse and disrespect towards other players and staff members is prohibited. If you are
						caught doing these things, you may receive a warning.
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="harassment"
				:ref="accordionRefs.harassment"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconAlertTriangle />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Harassment & Threats
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Doxxing, threats, and impersonations
							</span>
						</div>
					</div>
				</template>
				<MessageBanner class="mx-4" message-type="danger">
					<strong class="text-red">
						If you are caught doing any of the following, you will be banned immediately
					</strong>
					and reported directly to Discord support.
				</MessageBanner>
				<ul class="mx-4">
					<li>Doxxing (sharing another person's private or personal information)</li>
					<li>Harassment of any kind</li>
					<li>Making threats against other members</li>
					<li>Impersonating another player or staff member</li>
					<li>Soliciting private information about another person</li>
				</ul>
			</Accordion>
			<Accordion
				id="advertising"
				:ref="accordionRefs.advertising"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconVolume3 />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Advertising & Promotions
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								No unsolicited promotion in any channel
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						Advertisement of other Discord servers, Minecraft servers, or self-promotion of any
						social media in any chat channel is prohibited.
					</li>
					<li>The only exception is content directly related to Vanilla Tyme Servers.</li>
					<li>Vandalization of the server in any way will result in administrative action.</li>
				</ol>
			</Accordion>
			<Accordion
				id="ban-evasion"
				:ref="accordionRefs.ban_evasion"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconUserX />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Ban Evasion
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Alt accounts and assistance held accountable
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						If you are caught evading a ban in-game or through Discord, you will be banned on any
						alternative accounts as well.
					</li>
					<li>Anyone assisting a ban evasion will also be held accountable.</li>
				</ol>
			</Accordion>
			<Accordion
				id="disclaimer"
				:ref="accordionRefs.disclaimer"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<IconHandFinger />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Disclaimer
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Liability notice
							</span>
						</div>
					</div>
				</template>
				<div class="mx-4 flex flex-col gap-4">
					<span>
						By participating in the official Vanilla Tyme Servers forum, Minecraft servers, or
						Discord, you voluntarily agree that the staff team is not liable for anything that
						happens to you, your computer, or any personal effects as a direct or indirect result of
						using the aforementioned services.
					</span>
					<span>
						We cannot be held liable for what other players say or do, but if someone breaches the
						basic terms of service or server rules, please send a screenshot with a time and date.
						We will investigate and take administrative action where necessary.
					</span>
				</div>
			</Accordion>
		</div>
		<div class="rules-cta mt-10">
			<h2 class="rules-cta__title">Need to report something?</h2>
			<p class="rules-cta__subtitle">
				Open a support ticket in Discord or reach out to a staff member directly. We take all
				reports seriously.
			</p>
			<ButtonLink
				type="colored-text"
				color="brand"
				size="lg"
				href="https://discord.com/channels/304066050201485322/950596143258165288"
				target="_blank"
				rel="noopener"
			>
				Open a ticket
				<ChevronRightIcon aria-hidden="true" />
			</ButtonLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	BanIcon,
	BellOffIcon,
	ChevronRightIcon,
	HeartIcon,
	InfoIcon,
	MessageSquareWarningIcon,
	ShieldBanIcon,
	TriangleAlertIcon,
	Volume2Icon,
	WorldIcon,
	XIcon,
} from '@modrinth/assets'
import { Accordion, ButtonLink } from '@modrinth/ui'

import MessageBanner from '~/components/ui/MessageBanner.vue'
import NavStack from '~/components/ui/NavStack.vue'

definePageMeta({
	hero: {
		pre: 'Discord',
		accent: 'Guidelines',
		subtitle:
			'Applies to all channels, usernames, nicknames, avatars, statuses, and emotes across the Vanilla Tyme Discord server.',
	},
})
function scrollToSection(id: string) {
	const el = document.getElementById(id)
	if (!el) return
	const top = el.getBoundingClientRect().top + window.scrollY - 16
	window.scrollTo({ top, behavior: 'smooth' })
}

const sectionIds = [
	'scope',
	'respect',
	'drama',
	'discrimination',
	'illegal',
	'spam',
	'harassment',
	'advertising',
	'ban-evasion',
	'disclaimer',
]
const accordions = reactive<Record<string, any>>({})
const accordionRefs = Object.fromEntries(
	sectionIds.map((id) => [
		id,
		(el: any) => {
			if (el) accordions[id] = el
			else delete accordions[id]
		},
	]),
)

const anyOpen = computed(() => (Object.values(accordions) as any[]).some((a) => a.isOpen))
function toggleAll() {
	const open = !anyOpen.value
	for (const a of Object.values(accordions) as any[]) {
		open ? a.open() : a.close()
	}
}

const rulesToolbar = inject<{
	toggleAll: (() => void) | null
	anyOpen: boolean
} | null>('rulesToolbar', null)

if (rulesToolbar) {
	rulesToolbar.toggleAll = toggleAll
	watch(anyOpen, (v) => (rulesToolbar.anyOpen = v), { immediate: true })
	onBeforeUnmount(() => {
		if (rulesToolbar.toggleAll === toggleAll) {
			rulesToolbar.toggleAll = null
			rulesToolbar.anyOpen = false
		}
	})
}
</script>

<style lang="scss">
.normal-page__content :deep(a) {
	color: var(--color-link);
	text-decoration: underline;

	&:focus-visible,
	&:hover {
		color: var(--color-link-hover);
	}

	&:active {
		color: var(--color-link-active);
	}
}
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
.rule-icon {
	--_size: 2rem;

	border: 1px solid var(--surface-5);
	background-color: var(--color-button-bg);
	object-fit: contain;
	border-radius: calc(16 / 96 * var(--_override-size, var(--_size)));
	position: relative;
	height: var(--_override-size, var(--_size));
	width: var(--_override-size, var(--_size));
	min-height: var(--_override-size, var(--_size));
	min-width: var(--_override-size, var(--_size));

	&.circle {
		border-radius: 50%;
	}

	&:not(.no-shadow) {
		box-shadow: var(--shadow-card);
	}

	&.no-shadow {
		box-shadow: none;
	}

	&.pixelated {
		image-rendering: pixelated;
	}

	&.raised {
		background-color: var(--color-raised-bg);
	}

	&.tint {
		background-color: color-mix(in oklch, var(--color-button-bg) 100%, var(--_tint) 5%);
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
.examples {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 0.5rem;
}
.chip {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.3rem 0.7rem;
	border-radius: 999px;
	font-size: 0.8rem;
	color: var(--landing-color-heading);
	background: color-mix(in oklch, var(--landing-color-subheading) 8%, transparent);
	border: 1px solid color-mix(in oklch, var(--landing-color-subheading) 15%, transparent);
}
.chip code {
	font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
	font-weight: 700;
	color: var(--color-brand);
}
.facts {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
}
.fact {
	flex: 1;
	min-width: 130px;
	padding: 0.875rem 1rem;
	border-radius: 0.75rem;
	background: color-mix(in oklch, var(--landing-color-subheading) 5%, transparent);
	border: 1px solid color-mix(in oklch, var(--landing-color-subheading) 12%, transparent);
}
.fact-value {
	font-size: 1.4rem;
	font-weight: 800;
	line-height: 1.1;
	color: var(--color-brand);
}
.fact-label {
	margin-top: 0.25rem;
	font-size: 0.75rem;
	color: var(--landing-color-subheading);
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
.topic-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 0.75rem 0 0.25rem;

	&:not(:last-child) {
		margin-bottom: 0.75rem;
	}
}
.topic-tag {
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	padding: 0.3rem 0.7rem;
	border-radius: 999px;
	font-size: 0.78rem;
	font-weight: 600;
	color: var(--color-red);
	background: color-mix(in oklch, var(--color-red) 7%, transparent);
	border: 1px solid color-mix(in oklch, var(--color-red) 18%, transparent);

	svg {
		width: 0.85rem;
		height: 0.85rem;
		flex-shrink: 0;
		opacity: 0.7;
	}

	&:has(svg) {
		cursor: help;
	}
}
</style>
