<template>
	<aside class="normal-page__sidebar">
		<div class="rules-content">
			<NavStack
				:items="[
					{
						type: 'heading',
						label: formatMessage(messages.onThisPage),
					},
					{
						label: formatMessage(messages.scopeTitle),
						action: () => scrollToSection('scope'),
					},
					{
						label: formatMessage(messages.respectTitle),
						action: () => scrollToSection('respect'),
					},
					{
						label: formatMessage(messages.dramaTitle),
						action: () => scrollToSection('drama'),
					},
					{
						label: formatMessage(messages.discriminationTitle),
						action: () => scrollToSection('discrimination'),
					},
					{
						label: formatMessage(messages.illegalTitle),
						action: () => scrollToSection('illegal'),
					},
					{
						label: formatMessage(messages.spamTitle),
						action: () => scrollToSection('spam'),
					},
					{
						label: formatMessage(messages.harassmentTitle),
						action: () => scrollToSection('harassment'),
					},
					{
						label: formatMessage(messages.advertisingNavLabel),
						action: () => scrollToSection('advertising'),
					},
					{
						label: formatMessage(messages.banEvasionTitle),
						action: () => scrollToSection('ban-evasion'),
					},
					{
						label: formatMessage(messages.disclaimerTitle),
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
							<WorldIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.scopeTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.scopeSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<Admonition type="info" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.scopeNickname">
						<template #strong="{ children }">
							<strong class="text-brand">
								<component :is="() => normalizeChildren(children)" />
							</strong>
						</template>
					</IntlFormatted>
				</Admonition>
				<div class="mx-4">
					{{ formatMessage(messages.scopeApplies) }}
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
							<HeartIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.respectTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.respectSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.respectOpinions) }}</li>
					<li>{{ formatMessage(messages.respectLanguage) }}</li>
				</ol>
				<Admonition type="warning" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.respectProhibitedTopics">
						<template #strong="{ children }">
							<strong class="text-orange">
								<component :is="() => normalizeChildren(children)" />
							</strong>
						</template>
					</IntlFormatted>
					<div class="topic-tags">
						<span class="topic-tag">{{ formatMessage(messages.topicReligion) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.topicPolitics) }}</span>
						<span v-tooltip="formatMessage(messages.topicNsfwTooltip)" class="topic-tag"
							>{{ formatMessage(messages.topicNsfw) }} <InfoIcon
						/></span>
						<span class="topic-tag">{{ formatMessage(messages.topicGore) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.topicBlood) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.topicExtremism) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.topicAnimalCruelty) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.topicAntiLgbtqia) }}</span>
					</div>
					<span>{{ formatMessage(messages.respectTopicsRemoved) }}</span>
				</Admonition>
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
							<MessageSquareWarningIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.dramaTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.dramaSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.dramaBeKind) }}</li>
					<li>{{ formatMessage(messages.dramaPrivateDisputes) }}</li>
					<li>{{ formatMessage(messages.dramaNoToxicity) }}</li>
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
							<BanIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.discriminationTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.discriminationSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<div class="mx-4">
					<span>{{ formatMessage(messages.discriminationNotCondoned) }}</span>
					<div class="topic-tags">
						<span class="topic-tag">{{ formatMessage(messages.ismRacism) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.ismAbleism) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.ismSexism) }}</span>
						<span class="topic-tag">{{ formatMessage(messages.ismAgeism) }}</span>
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
							<ShieldBanIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.illegalTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.illegalSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<Admonition type="critical" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.illegalBehavior">
						<template #strong="{ children }">
							<strong class="text-red">
								<component :is="() => normalizeChildren(children)" />
							</strong>
						</template>
					</IntlFormatted>
				</Admonition>
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
							<BellOffIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.spamTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.spamSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.spamMentions) }}</li>
					<li>{{ formatMessage(messages.spamDisrespect) }}</li>
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
							<TriangleAlertIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.harassmentTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.harassmentSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<Admonition type="critical" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.harassmentImmediateBan">
						<template #strong="{ children }">
							<strong class="text-red">
								<component :is="() => normalizeChildren(children)" />
							</strong>
						</template>
					</IntlFormatted>
				</Admonition>
				<ul class="mx-4">
					<li>{{ formatMessage(messages.harassmentDoxxing) }}</li>
					<li>{{ formatMessage(messages.harassmentAnyKind) }}</li>
					<li>{{ formatMessage(messages.harassmentThreats) }}</li>
					<li>{{ formatMessage(messages.harassmentImpersonation) }}</li>
					<li>{{ formatMessage(messages.harassmentSoliciting) }}</li>
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
							<Volume2Icon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.advertisingTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.advertisingSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.advertisingProhibited) }}</li>
					<li>{{ formatMessage(messages.advertisingException) }}</li>
					<li>{{ formatMessage(messages.advertisingVandalization) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="ban-evasion"
				:ref="accordionRefs['ban-evasion']"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<UserXIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.banEvasionTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.banEvasionSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.banEvasionAltAccounts) }}</li>
					<li>{{ formatMessage(messages.banEvasionAssisting) }}</li>
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
							<PointerIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.disclaimerTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.disclaimerSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<div class="mx-4 flex flex-col gap-4">
					<span>{{ formatMessage(messages.disclaimerParticipation) }}</span>
					<span>{{ formatMessage(messages.disclaimerOtherPlayers) }}</span>
				</div>
			</Accordion>
		</div>
		<div class="rules-cta mt-10">
			<h2 class="rules-cta__title">{{ formatMessage(messages.ctaTitle) }}</h2>
			<p class="rules-cta__subtitle">
				{{ formatMessage(messages.ctaDescription) }}
			</p>
			<ButtonLink
				type="colored-text"
				color="brand"
				size="lg"
				href="https://discord.com/channels/304066050201485322/950596143258165288"
				target="_blank"
				rel="noopener"
			>
				{{ formatMessage(messages.ctaButton) }}
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
	PointerIcon,
	ShieldBanIcon,
	TriangleAlertIcon,
	UserXIcon,
	Volume2Icon,
	WorldIcon,
} from '@modrinth/assets'
import {
	Accordion,
	Admonition,
	ButtonLink,
	defineMessages,
	IntlFormatted,
	normalizeChildren,
	useVIntl,
} from '@modrinth/ui'

import NavStack from '~/components/ui/NavStack.vue'

const { formatMessage } = useVIntl()

const messages = defineMessages({
	onThisPage: {
		id: 'rules.on-this-page',
		defaultMessage: 'On this page',
	},
	scopeTitle: {
		id: 'rules.discord.scope.title',
		defaultMessage: 'Scope',
	},
	scopeSubtitle: {
		id: 'rules.discord.scope.subtitle',
		defaultMessage: 'These rules apply server-wide',
	},
	scopeNickname: {
		id: 'rules.discord.scope.nickname',
		defaultMessage:
			'<strong>Change your nickname to your Minecraft in-game name.</strong> This prevents confusion and keeps the community organized.',
	},
	scopeApplies: {
		id: 'rules.discord.scope.applies',
		defaultMessage:
			'These guidelines apply to all usernames, nicknames, avatars, statuses, and emotes used within the Vanilla Tyme Discord server.',
	},
	respectTitle: {
		id: 'rules.discord.respect.title',
		defaultMessage: 'Respect & Conduct',
	},
	respectSubtitle: {
		id: 'rules.discord.respect.subtitle',
		defaultMessage: 'Be thoughtful, civil, and inclusive',
	},
	respectOpinions: {
		id: 'rules.discord.respect.opinions',
		defaultMessage:
			'Everyone has the right to express their opinion — but remain thoughtful and respectful. Do not post anything offensive, abusive, or that constitutes hate speech of any kind.',
	},
	respectLanguage: {
		id: 'rules.discord.respect.language',
		defaultMessage:
			'Excessive offensive language is prohibited. Cursing is allowed, but keep it tasteful.',
	},
	respectProhibitedTopics: {
		id: 'rules.discord.respect.prohibited-topics',
		defaultMessage:
			'<strong>Prohibited topics</strong> — heated/hot-button discussions or posting images/GIFs of the following is not allowed:',
	},
	topicReligion: {
		id: 'rules.discord.respect.topic.religion',
		defaultMessage: 'Religion',
	},
	topicPolitics: {
		id: 'rules.discord.respect.topic.politics',
		defaultMessage: 'Politics',
	},
	topicNsfw: {
		id: 'rules.discord.respect.topic.nsfw',
		defaultMessage: 'NSFW',
	},
	topicNsfwTooltip: {
		id: 'rules.discord.respect.topic.nsfw-tooltip',
		defaultMessage: 'Includes adult themed things, general obscenities or sexually explicit images',
	},
	topicGore: {
		id: 'rules.discord.respect.topic.gore',
		defaultMessage: 'Gore / Self-harm',
	},
	topicBlood: {
		id: 'rules.discord.respect.topic.blood',
		defaultMessage: 'Open wounds / Blood',
	},
	topicExtremism: {
		id: 'rules.discord.respect.topic.extremism',
		defaultMessage: 'Any Extremism',
	},
	topicAnimalCruelty: {
		id: 'rules.discord.respect.topic.animal-cruelty',
		defaultMessage: 'Animal Cruelty',
	},
	topicAntiLgbtqia: {
		id: 'rules.discord.respect.topic.anti-lgbtqia',
		defaultMessage: 'Anti-LGBTQIA+',
	},
	respectTopicsRemoved: {
		id: 'rules.discord.respect.topics-removed',
		defaultMessage:
			'Discussion of these topics will be immediately removed and administrative action will be taken against all participants.',
	},
	dramaTitle: {
		id: 'rules.discord.drama.title',
		defaultMessage: 'Drama & Disputes',
	},
	dramaSubtitle: {
		id: 'rules.discord.drama.subtitle',
		defaultMessage: 'Handle conflicts privately, not in public channels',
	},
	dramaBeKind: {
		id: 'rules.discord.drama.be-kind',
		defaultMessage:
			'Be kind and strive to keep negativity and drama out of all server chat channels, including in-game.',
	},
	dramaPrivateDisputes: {
		id: 'rules.discord.drama.private-disputes',
		defaultMessage:
			'All disputes must be handled privately. If you are caught arguing disrespectfully with another person, you may face consequences for inciting drama..',
	},
	dramaNoToxicity: {
		id: 'rules.discord.drama.no-toxicity',
		defaultMessage: 'Toxicity and animosity in public chat channels will not be tolerated.',
	},
	discriminationTitle: {
		id: 'rules.discord.discrimination.title',
		defaultMessage: 'Discrimination',
	},
	discriminationSubtitle: {
		id: 'rules.discord.discrimination.subtitle',
		defaultMessage: 'No "-isms" of any kind',
	},
	discriminationNotCondoned: {
		id: 'rules.discord.discrimination.not-condoned',
		defaultMessage:
			'We do not condone or support any acts of "-isms." If you are found perpetrating any of these, you will face administrative action.',
	},
	ismRacism: {
		id: 'rules.discord.discrimination.racism',
		defaultMessage: 'Racism',
	},
	ismAbleism: {
		id: 'rules.discord.discrimination.ableism',
		defaultMessage: 'Ableism',
	},
	ismSexism: {
		id: 'rules.discord.discrimination.sexism',
		defaultMessage: 'Sexism',
	},
	ismAgeism: {
		id: 'rules.discord.discrimination.ageism',
		defaultMessage: 'Ageism',
	},
	illegalTitle: {
		id: 'rules.discord.illegal.title',
		defaultMessage: 'Illegal Activity',
	},
	illegalSubtitle: {
		id: 'rules.discord.illegal.subtitle',
		defaultMessage: 'Promotion of illegal acts may result in removal from the platform.',
	},
	illegalBehavior: {
		id: 'rules.discord.illegal.behavior',
		defaultMessage:
			"<strong>Promotion, encouragement, or engagement in any illegal behavior</strong> is unlawful and prohibited. Topics will be reported to Discord'a Trust & Safety team. You may be removed from the platform and potentially reported to local law enforcement.",
	},
	spamTitle: {
		id: 'rules.discord.spam.title',
		defaultMessage: 'Spam & Abuse',
	},
	spamSubtitle: {
		id: 'rules.discord.spam.subtitle',
		defaultMessage: "Don't flood channels or abuse mentions",
	},
	spamMentions: {
		id: 'rules.discord.spam.mentions',
		defaultMessage:
			'Spamming messages, mass-pinging, spam-pinging staff, and abuse of the mentions system is prohibited.',
	},
	spamDisrespect: {
		id: 'rules.discord.spam.disrespect',
		defaultMessage:
			'Abuse and disrespect towards other players and staff members is prohibited. If you are caught doing these things, you may receive a warning.',
	},
	harassmentTitle: {
		id: 'rules.discord.harassment.title',
		defaultMessage: 'Harassment & Threats',
	},
	harassmentSubtitle: {
		id: 'rules.discord.harassment.subtitle',
		defaultMessage: 'Doxxing, threats, and impersonations',
	},
	harassmentImmediateBan: {
		id: 'rules.discord.harassment.immediate-ban',
		defaultMessage:
			'<strong>If you are caught doing any of the following, you will be banned immediately</strong> and reported directly to Discord support.',
	},
	harassmentDoxxing: {
		id: 'rules.discord.harassment.doxxing',
		defaultMessage: "Doxxing (sharing another person's private or personal information)",
	},
	harassmentAnyKind: {
		id: 'rules.discord.harassment.any-kind',
		defaultMessage: 'Harassment of any kind',
	},
	harassmentThreats: {
		id: 'rules.discord.harassment.threats',
		defaultMessage: 'Making threats against other members',
	},
	harassmentImpersonation: {
		id: 'rules.discord.harassment.impersonation',
		defaultMessage: 'Impersonating another player or staff member',
	},
	harassmentSoliciting: {
		id: 'rules.discord.harassment.soliciting',
		defaultMessage: 'Soliciting private information about another person',
	},
	advertisingNavLabel: {
		id: 'rules.discord.advertising.nav-label',
		defaultMessage: 'Advertising',
	},
	advertisingTitle: {
		id: 'rules.discord.advertising.title',
		defaultMessage: 'Advertising & Promotions',
	},
	advertisingSubtitle: {
		id: 'rules.discord.advertising.subtitle',
		defaultMessage: 'No unsolicited promotion in any channel',
	},
	advertisingProhibited: {
		id: 'rules.discord.advertising.prohibited',
		defaultMessage:
			'Advertisement of other Discord servers, Minecraft servers, or self-promotion of any social media in any chat channel is prohibited.',
	},
	advertisingException: {
		id: 'rules.discord.advertising.exception',
		defaultMessage: 'The only exception is content directly related to Vanilla Tyme Servers.',
	},
	advertisingVandalization: {
		id: 'rules.discord.advertising.vandalization',
		defaultMessage: 'Vandalization of the server in any way will result in administrative action.',
	},
	banEvasionTitle: {
		id: 'rules.discord.ban-evasion.title',
		defaultMessage: 'Ban Evasion',
	},
	banEvasionSubtitle: {
		id: 'rules.discord.ban-evasion.subtitle',
		defaultMessage: 'Alt accounts and assistance held accountable',
	},
	banEvasionAltAccounts: {
		id: 'rules.discord.ban-evasion.alt-accounts',
		defaultMessage:
			'If you are caught evading a ban in-game or through Discord, you will be banned on any alternative accounts as well.',
	},
	banEvasionAssisting: {
		id: 'rules.discord.ban-evasion.assisting',
		defaultMessage: 'Anyone assisting a ban evasion will also be held accountable.',
	},
	disclaimerTitle: {
		id: 'rules.discord.disclaimer.title',
		defaultMessage: 'Disclaimer',
	},
	disclaimerSubtitle: {
		id: 'rules.discord.disclaimer.subtitle',
		defaultMessage: 'Liability notice',
	},
	disclaimerParticipation: {
		id: 'rules.discord.disclaimer.participation',
		defaultMessage:
			'By participating in the official Vanilla Tyme Servers forum, Minecraft servers, or Discord, you voluntarily agree that the staff team is not liable for anything that happens to you, your computer, or any personal effects as a direct or indirect result of using the aforementioned services.',
	},
	disclaimerOtherPlayers: {
		id: 'rules.discord.disclaimer.other-players',
		defaultMessage:
			'We cannot be held liable for what other players say or do, but if someone breaches the basic terms of service or server rules, please send a screenshot with a time and date. We will investigate and take administrative action where necessary.',
	},
	ctaTitle: {
		id: 'rules.discord.cta.title',
		defaultMessage: 'Need to report something?',
	},
	ctaDescription: {
		id: 'rules.discord.cta.description',
		defaultMessage:
			'Open a support ticket in Discord or reach out to a staff member directly. We take all reports seriously.',
	},
	ctaButton: {
		id: 'rules.cta.open-ticket',
		defaultMessage: 'Open a ticket',
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

<style lang="scss" scoped>
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
