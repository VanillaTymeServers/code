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
						label: formatMessage(messages.farmsTitle),
						action: () => scrollToSection('farms'),
					},
					{
						label: formatMessage(messages.fairPlayTitle),
						action: () => scrollToSection('fair-play'),
					},
					{
						label: formatMessage(messages.miningTitle),
						action: () => scrollToSection('mining'),
					},
					{
						label: formatMessage(messages.craftingTitle),
						action: () => scrollToSection('crafting'),
					},
					{
						label: formatMessage(messages.winningTitle),
						action: () => scrollToSection('winning'),
					},
					{
						label: formatMessage(messages.nittyGrittyTitle),
						action: () => scrollToSection('nitty-gritty'),
					},
				]"
			/>
		</div>
	</aside>
	<div class="normal-page__content mt-3 lg:mt-0">
		<Admonition type="info" class="mb-3">
			<IntlFormatted :message-id="messages.intro">
				<template #main-rules-link="{ children }">
					<nuxt-link to="/rules" class="text-brand">
						<component :is="() => normalizeChildren(children)" />
					</nuxt-link>
				</template>
			</IntlFormatted>
		</Admonition>
		<div class="flex flex-col gap-3">
			<Accordion
				id="farms"
				:ref="accordionRefs.farms"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<CalendarIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.farmsTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.farmsSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<Admonition type="warning" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.farmsEveryOtherWeek">
						<template #strong="{ children }">
							<strong>
								<component :is="() => normalizeChildren(children)" />
							</strong>
						</template>
					</IntlFormatted>
				</Admonition>
				<ol class="mx-4">
					<li>
						{{ formatMessage(messages.farmsNoAutoFarms) }}
						<ul>
							<li>{{ formatMessage(messages.farmsNoRedstone) }}</li>
						</ul>
					</li>
					<li>
						{{ formatMessage(messages.farmsNoMobFarms) }}
						<ul>
							<li>{{ formatMessage(messages.farmsNoSpawners) }}</li>
						</ul>
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="fair-play"
				:ref="accordionRefs['fair-play']"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<ScaleIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.fairPlayTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.fairPlaySubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.fairPlayNoVillagerTrading) }}</li>
					<li>{{ formatMessage(messages.fairPlayNoSpying) }}</li>
					<li>{{ formatMessage(messages.fairPlayNoMatchFixing) }}</li>
					<li>
						{{ formatMessage(messages.fairPlayOwnResources) }}
						<ul>
							<li>{{ formatMessage(messages.fairPlayNoTrading) }}</li>
							<li>{{ formatMessage(messages.fairPlayNoStoredMaterials) }}</li>
						</ul>
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="mining"
				:ref="accordionRefs.mining"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<PickaxeIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.miningTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.miningSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.miningNoReplacing) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="crafting"
				:ref="accordionRefs.crafting"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<HammerIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.craftingTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.craftingSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.craftingTableOrInventory) }}</li>
					<li>{{ formatMessage(messages.craftingNoAutoCrafters) }}</li>
					<li>{{ formatMessage(messages.craftingNoUncrafting) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="winning"
				:ref="accordionRefs.winning"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<CrownIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.winningTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.winningSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<div class="facts mx-4">
					<div class="fact">
						<div class="fact-value">3</div>
						<div class="fact-label">{{ formatMessage(messages.winningPrizeBoxes) }}</div>
					</div>
					<div class="fact">
						<div class="fact-value">30</div>
						<div class="fact-label">{{ formatMessage(messages.winningChampDays) }}</div>
					</div>
				</div>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.winningTopThree) }}</li>
					<li>
						{{ formatMessage(messages.winningChampTag) }}
						<ul>
							<li>{{ formatMessage(messages.winningChampCooldown) }}</li>
						</ul>
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="nitty-gritty"
				:ref="accordionRefs['nitty-gritty']"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<GavelIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.nittyGrittyTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.nittyGrittySubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.nittyGrittyAmendments) }}</li>
					<li>{{ formatMessage(messages.nittyGrittyDisqualification) }}</li>
					<li>{{ formatMessage(messages.nittyGrittyReportMistakes) }}</li>
				</ol>
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
				target="_blank"
				href="https://discord.com/channels/304066050201485322/950596143258165288"
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
	CalendarIcon,
	ChevronRightIcon,
	CrownIcon,
	GavelIcon,
	HammerIcon,
	PickaxeIcon,
	ScaleIcon,
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
	intro: {
		id: 'rules.competitions.intro',
		defaultMessage:
			'Our weekly competitions are here to keep Vanilla Tyme fun for everyone, with a fair chance and a level playing field. These rules apply on top of all of our <main-rules-link>main server rules</main-rules-link>.',
	},
	farmsTitle: {
		id: 'rules.competitions.farms.title',
		defaultMessage: 'Farms and Redstone',
	},
	farmsSubtitle: {
		id: 'rules.competitions.farms.subtitle',
		defaultMessage: 'Allowed every other week',
	},
	farmsEveryOtherWeek: {
		id: 'rules.competitions.farms.every-other-week',
		defaultMessage:
			"Auto farms and mob farms are allowed <strong>every other week</strong>. Always read that week's competition announcement to check whether farms are allowed. On weeks they're not, the rules below apply.",
	},
	farmsNoAutoFarms: {
		id: 'rules.competitions.farms.no-auto-farms',
		defaultMessage: 'No auto farms.',
	},
	farmsNoRedstone: {
		id: 'rules.competitions.farms.no-redstone',
		defaultMessage: "Players can't use redstone, redstone components, or water streams.",
	},
	farmsNoMobFarms: {
		id: 'rules.competitions.farms.no-mob-farms',
		defaultMessage: 'No mob farms.',
	},
	farmsNoSpawners: {
		id: 'rules.competitions.farms.no-spawners',
		defaultMessage: 'Spawners and player-built farms are prohibited.',
	},
	fairPlayTitle: {
		id: 'rules.competitions.fair-play.title',
		defaultMessage: 'Fair Play',
	},
	fairPlaySubtitle: {
		id: 'rules.competitions.fair-play.subtitle',
		defaultMessage: 'Everyone starts from scratch',
	},
	fairPlayNoVillagerTrading: {
		id: 'rules.competitions.fair-play.no-villager-trading',
		defaultMessage: 'No villager trading.',
	},
	fairPlayNoSpying: {
		id: 'rules.competitions.fair-play.no-spying',
		defaultMessage: 'No spying on fellow players.',
	},
	fairPlayNoMatchFixing: {
		id: 'rules.competitions.fair-play.no-match-fixing',
		defaultMessage:
			'No match fixing, collusion, bribing, or fixing the outcome of the competition.',
	},
	fairPlayOwnResources: {
		id: 'rules.competitions.fair-play.own-resources',
		defaultMessage: 'All resources must be gathered by you during the current competition.',
	},
	fairPlayNoTrading: {
		id: 'rules.competitions.fair-play.no-trading',
		defaultMessage: "You can't buy, trade, or get materials for free from others.",
	},
	fairPlayNoStoredMaterials: {
		id: 'rules.competitions.fair-play.no-stored-materials',
		defaultMessage: "You can't use materials you gathered or stored before the competition.",
	},
	miningTitle: {
		id: 'rules.competitions.mining.title',
		defaultMessage: 'Mining',
	},
	miningSubtitle: {
		id: 'rules.competitions.mining.subtitle',
		defaultMessage: 'Every block has to be dug up fresh',
	},
	miningNoReplacing: {
		id: 'rules.competitions.mining.no-replacing',
		defaultMessage:
			"Placing and re-mining blocks isn't allowed. This includes blocks you bought or got from prize boxes.",
	},
	craftingTitle: {
		id: 'rules.competitions.crafting.title',
		defaultMessage: 'Crafting',
	},
	craftingSubtitle: {
		id: 'rules.competitions.crafting.subtitle',
		defaultMessage: 'Craft it once, and craft it by hand',
	},
	craftingTableOrInventory: {
		id: 'rules.competitions.crafting.table-or-inventory',
		defaultMessage: 'Items must be crafted at a crafting table or in your inventory grid.',
	},
	craftingNoAutoCrafters: {
		id: 'rules.competitions.crafting.no-auto-crafters',
		defaultMessage: "Auto crafters can't be used, even on weeks when farms are allowed.",
	},
	craftingNoUncrafting: {
		id: 'rules.competitions.crafting.no-uncrafting',
		defaultMessage:
			"No uncrafting and re-crafting. For example, blocks can't be broken back into ingots and crafted into blocks again.",
	},
	winningTitle: {
		id: 'rules.competitions.winning.title',
		defaultMessage: 'Winning the Competition',
	},
	winningSubtitle: {
		id: 'rules.competitions.winning.subtitle',
		defaultMessage: 'Prize boxes, trophies, and the Champ tag',
	},
	winningPrizeBoxes: {
		id: 'rules.competitions.winning.prize-boxes',
		defaultMessage: 'prize boxes each week',
	},
	winningChampDays: {
		id: 'rules.competitions.winning.champ-days',
		defaultMessage: 'days with the Champ tag',
	},
	winningTopThree: {
		id: 'rules.competitions.winning.top-three',
		defaultMessage:
			'The top 3 players on the scoreboard each week win a prize box, which includes a trophy.',
	},
	winningChampTag: {
		id: 'rules.competitions.winning.champ-tag',
		defaultMessage: 'The player in 1st place gets the in-game "Champ" tag for 30 days.',
	},
	winningChampCooldown: {
		id: 'rules.competitions.winning.champ-cooldown',
		defaultMessage:
			"While you have the Champ tag, you can't place in the top 3 again until it expires.",
	},
	nittyGrittyTitle: {
		id: 'rules.competitions.nitty-gritty.title',
		defaultMessage: 'The Nitty Gritty',
	},
	nittyGrittySubtitle: {
		id: 'rules.competitions.nitty-gritty.subtitle',
		defaultMessage: 'Disqualifications and loopholes',
	},
	nittyGrittyAmendments: {
		id: 'rules.competitions.nitty-gritty.amendments',
		defaultMessage: 'Staff may change these rules for specific competition categories at any time.',
	},
	nittyGrittyDisqualification: {
		id: 'rules.competitions.nitty-gritty.disqualification',
		defaultMessage:
			"Breaking any rule gets you disqualified from that week's competition. If you get a DQ tag, you can't take part in the current week's or next week's competition.",
	},
	nittyGrittyReportMistakes: {
		id: 'rules.competitions.nitty-gritty.report-mistakes',
		defaultMessage:
			'Report any mistakes or loopholes to staff with a support ticket in Discord. If you own up to breaking a rule, staff are more likely to adjust your score than disqualify you.',
	},
	ctaTitle: {
		id: 'rules.competitions.cta.title',
		defaultMessage: 'Ready to compete?',
	},
	ctaDescription: {
		id: 'rules.competitions.cta.description',
		defaultMessage:
			"Check each week's announcement for the category and whether farms are allowed. Questions? Open a ticket in our Discord.",
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

const sectionIds = ['farms', 'fair-play', 'mining', 'crafting', 'winning', 'nitty-gritty']
const accordions = reactive(new Map<string, any>())
const accordionRefs = Object.fromEntries(
	sectionIds.map((id) => [
		id,
		(el: any) => {
			if (el) accordions.set(id, el)
			else accordions.delete(id)
		},
	]),
)

const anyOpen = computed(() => [...accordions.values()].some((a) => a.isOpen))
function toggleAll() {
	const open = !anyOpen.value
	for (const a of accordions.values()) {
		if (open) a.open()
		else a.close()
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
.facts {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-bottom: 1rem;
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
</style>
