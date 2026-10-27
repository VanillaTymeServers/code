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
						label: formatMessage(messages.overviewTitle),
						action: () => scrollToSection('overview'),
					},
					{
						label: formatMessage(messages.permitsTitle),
						action: () => scrollToSection('permits'),
					},
					{
						label: formatMessage(messages.stallsTitle),
						action: () => scrollToSection('stalls'),
					},
					{
						label: formatMessage(messages.shopsTitle),
						action: () => scrollToSection('shops'),
					},
					{
						label: formatMessage(messages.maintenanceTitle),
						action: () => scrollToSection('maintenance'),
					},
				]"
			/>
		</div>
	</aside>
	<div class="normal-page__content mt-3 lg:mt-0">
		<div class="flex flex-col gap-3">
			<Accordion
				id="overview"
				:ref="accordionRefs.overview"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<SparklesIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.overviewTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.overviewSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.overviewChooseSpot) }}</li>
					<li>{{ formatMessage(messages.overviewNoStallAndShop) }}</li>
					<li>{{ formatMessage(messages.overviewSharing) }}</li>
					<li>{{ formatMessage(messages.overviewCurrencySign) }}</li>
				</ol>
				<Admonition type="info" class="mx-4 mb-3">
					<strong class="text-brand">{{ formatMessage(messages.currencyExamplesTitle) }}</strong>
					<div class="examples">
						<span class="chip">
							<code>{{ '<>' }}</code> {{ formatMessage(messages.currencyDiamond) }}
						</span>
						<span class="chip"> <code>d</code> {{ formatMessage(messages.currencyDiamond) }} </span>
						<span class="chip">
							<code>[ ]</code> {{ formatMessage(messages.currencyDiamondBlock) }}
						</span>
						<span class="chip"> <code>[ ]</code> {{ formatMessage(messages.currencySlot) }} </span>
					</div>
				</Admonition>
			</Accordion>
			<Accordion
				id="permits"
				:ref="accordionRefs.permits"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<ScrollTextIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.permitsTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.permitsSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<Admonition type="info" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.permitsMarty">
						<template #strong="{ children }">
							<strong class="text-brand">
								<component :is="() => normalizeChildren(children)" />
							</strong>
						</template>
						<template #highlight="{ children }">
							<span class="text-brand">
								<component :is="() => normalizeChildren(children)" />
							</span>
						</template>
					</IntlFormatted>
				</Admonition>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.permitsDisplay) }}</li>
					<li>{{ formatMessage(messages.permitsSwitching) }}</li>
					<li>{{ formatMessage(messages.permitsNoGiving) }}</li>
					<li>{{ formatMessage(messages.permitsOwnPermit) }}</li>
					<li>{{ formatMessage(messages.permitsNoRenaming) }}</li>
					<li>{{ formatMessage(messages.permitsNoMoving) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="stalls"
				:ref="accordionRefs.stalls"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<ShoppingCartIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.stallsTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.stallsSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<div class="facts mx-4">
					<div class="fact">
						<div class="fact-value">16</div>
						<div class="fact-label">{{ formatMessage(messages.stallsAvailable) }}</div>
					</div>
					<div class="fact">
						<div class="fact-value">10</div>
						<div class="fact-label">{{ formatMessage(messages.stallsMaxContainers) }}</div>
					</div>
				</div>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.stallsClaiming) }}</li>
					<li>{{ formatMessage(messages.stallsContainerLimit) }}</li>
					<li>{{ formatMessage(messages.stallsDecorations) }}</li>
					<li>{{ formatMessage(messages.stallsRearranging) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="shops"
				:ref="accordionRefs.shops"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<StoreIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.shopsTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.shopsSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<div class="facts mx-4">
					<div class="fact">
						<div class="fact-value">20&times;20</div>
						<div class="fact-label">{{ formatMessage(messages.shopsPlotSize) }}</div>
					</div>
					<div class="fact">
						<div class="fact-value">40</div>
						<div class="fact-label">{{ formatMessage(messages.shopsMaxBuildHeight) }}</div>
					</div>
					<div class="fact">
						<div class="fact-value">10</div>
						<div class="fact-label">{{ formatMessage(messages.shopsMaxDepth) }}</div>
					</div>
				</div>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.shopsMarkedPlots) }}</li>
					<li>{{ formatMessage(messages.shopsClaiming) }}</li>
					<li>{{ formatMessage(messages.shopsPlotDimensions) }}</li>
					<li>{{ formatMessage(messages.shopsBuildHeight) }}</li>
					<li>{{ formatMessage(messages.shopsTerraforming) }}</li>
					<li>{{ formatMessage(messages.shopsLighting) }}</li>
					<li>{{ formatMessage(messages.shopsEntityLimits) }}</li>
					<li>
						{{ formatMessage(messages.shopsRedstone) }}
						<ul>
							<li>{{ formatMessage(messages.shopsRedstonePistonDoors) }}</li>
							<li>{{ formatMessage(messages.shopsRedstoneLighting) }}</li>
							<li>{{ formatMessage(messages.shopsRedstoneDispensers) }}</li>
							<li>{{ formatMessage(messages.shopsRedstoneNoteBlocks) }}</li>
							<li>{{ formatMessage(messages.shopsRedstoneNoFarms) }}</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.shopsSwitching) }}</li>
					<li>{{ formatMessage(messages.shopsInvisibleItemFrames) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="maintenance"
				:ref="accordionRefs.maintenance"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<WrenchIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.maintenanceTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.maintenanceSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.maintenanceGoodStanding) }}</li>
					<li>{{ formatMessage(messages.maintenanceInactiveRemoval) }}</li>
					<li>{{ formatMessage(messages.maintenanceReopening) }}</li>
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
	ChevronRightIcon,
	ScrollTextIcon,
	ShoppingCartIcon,
	SparklesIcon,
	StoreIcon,
	WrenchIcon,
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
	overviewTitle: {
		id: 'rules.market.overview.title',
		defaultMessage: 'Overview',
	},
	overviewSubtitle: {
		id: 'rules.market.overview.subtitle',
		defaultMessage: 'How the market works',
	},
	overviewChooseSpot: {
		id: 'rules.market.overview.choose-spot',
		defaultMessage:
			'Choose between a pre-built stall or a blank plot to build your own shop. The full process is below.',
	},
	overviewNoStallAndShop: {
		id: 'rules.market.overview.no-stall-and-shop',
		defaultMessage: 'No player may have a stall and a shop at the same time.',
	},
	overviewSharing: {
		id: 'rules.market.overview.sharing',
		defaultMessage:
			'You can share a shop with other players — but no player may be part of more than one shop or stall at a time. Each player needs their own permit.',
	},
	overviewCurrencySign: {
		id: 'rules.market.overview.currency-sign',
		defaultMessage:
			"Display your shop's currency on a sign so pricing is clear. You can request any payment (diamonds, iron, etc.) as long as it's clearly marked and consistent.",
	},
	currencyExamplesTitle: {
		id: 'rules.market.currency-examples.title',
		defaultMessage: 'Currency sign examples',
	},
	currencyDiamond: {
		id: 'rules.market.currency-examples.diamond',
		defaultMessage: '= diamond',
	},
	currencyDiamondBlock: {
		id: 'rules.market.currency-examples.diamond-block',
		defaultMessage: '= diamond block',
	},
	currencySlot: {
		id: 'rules.market.currency-examples.slot',
		defaultMessage: '= a slot',
	},
	permitsTitle: {
		id: 'rules.market.permits.title',
		defaultMessage: 'Market Permits',
	},
	permitsSubtitle: {
		id: 'rules.market.permits.subtitle',
		defaultMessage: 'Required for every shop or stall member',
	},
	permitsMarty: {
		id: 'rules.market.permits.marty',
		defaultMessage:
			'<strong>Marty the Market Master</strong> sells permits at the permit office located in spawn <highlight>x0 z-116</highlight> for <highlight>2 diamond blocks</highlight> each.',
	},
	permitsDisplay: {
		id: 'rules.market.permits.display',
		defaultMessage:
			'Every shop/stall member must buy and display their own Market Permit, visible in the stall/shop immediately after claiming.',
	},
	permitsSwitching: {
		id: 'rules.market.permits.switching',
		defaultMessage:
			'To switch between a stall and a plot, fully vacate your current spot first, open a ticket to notify staff, and move your permit to the new spot.',
	},
	permitsNoGiving: {
		id: 'rules.market.permits.no-giving',
		defaultMessage: 'You may not give away or sell your permit to any player.',
	},
	permitsOwnPermit: {
		id: 'rules.market.permits.own-permit',
		defaultMessage: 'Each player must purchase their own permit.',
	},
	permitsNoRenaming: {
		id: 'rules.market.permits.no-renaming',
		defaultMessage: 'Permits should not be renamed.',
	},
	permitsNoMoving: {
		id: 'rules.market.permits.no-moving',
		defaultMessage: "Don't remove or move the permit of any shop/stall you're not a member of.",
	},
	stallsTitle: {
		id: 'rules.market.stalls.title',
		defaultMessage: 'Stalls',
	},
	stallsSubtitle: {
		id: 'rules.market.stalls.subtitle',
		defaultMessage: 'Pre-built & ready to sell — first come, first served',
	},
	stallsAvailable: {
		id: 'rules.market.stalls.available',
		defaultMessage: 'stalls available',
	},
	stallsMaxContainers: {
		id: 'rules.market.stalls.max-containers',
		defaultMessage: 'max barrels/chests',
	},
	stallsClaiming: {
		id: 'rules.market.stalls.claiming',
		defaultMessage:
			"To claim a stall, replace the vacant sign with your in-game name and the date you claimed. You must obtain a Market Permit first and display it immediately. If none are open, you'll have to wait — availability isn't guaranteed.",
	},
	stallsContainerLimit: {
		id: 'rules.market.stalls.container-limit',
		defaultMessage:
			'Each stall may have a maximum of 10 barrels/chests (a double chest counts as 2). You may not add more.',
	},
	stallsDecorations: {
		id: 'rules.market.stalls.decorations',
		defaultMessage:
			'You may add signs, banners, and up to 3 decorative player heads to promote your stall. Decorations must be attached to the stall.',
	},
	stallsRearranging: {
		id: 'rules.market.stalls.rearranging',
		defaultMessage:
			"You may rearrange the barrels and chests, but you may not remove, add, or swap out any of the stall's blocks.",
	},
	shopsTitle: {
		id: 'rules.market.shops.title',
		defaultMessage: 'Shops',
	},
	shopsSubtitle: {
		id: 'rules.market.shops.subtitle',
		defaultMessage: 'Build your own on a blank 20×20 plot',
	},
	shopsPlotSize: {
		id: 'rules.market.shops.plot-size',
		defaultMessage: 'plot size',
	},
	shopsMaxBuildHeight: {
		id: 'rules.market.shops.max-build-height',
		defaultMessage: 'max build height',
	},
	shopsMaxDepth: {
		id: 'rules.market.shops.max-depth',
		defaultMessage: 'max depth below floor',
	},
	shopsMarkedPlots: {
		id: 'rules.market.shops.marked-plots',
		defaultMessage:
			'All plot locations are clearly marked with concrete at the corners. You may not create your own plot.',
	},
	shopsClaiming: {
		id: 'rules.market.shops.claiming',
		defaultMessage:
			"To claim a plot, replace the vacant sign with your in-game name and the date you claimed. Obtain a Market Permit first and display it immediately. If none are open, you'll have to wait.",
	},
	shopsPlotDimensions: {
		id: 'rules.market.shops.plot-dimensions',
		defaultMessage:
			'All plots are 20×20 blocks. Only banners, trapdoors, buttons, and signs may overhang the plot.',
	},
	shopsBuildHeight: {
		id: 'rules.market.shops.build-height',
		defaultMessage:
			'Max build height is 40 blocks above natural ground level. Builds may descend up to 10 blocks below your floor level.',
	},
	shopsTerraforming: {
		id: 'rules.market.shops.terraforming',
		defaultMessage: 'Minimal terraforming of the ground is allowed.',
	},
	shopsLighting: {
		id: 'rules.market.shops.lighting',
		defaultMessage: 'All shops must be lit so mobs cannot spawn — including roofs.',
	},
	shopsEntityLimits: {
		id: 'rules.market.shops.entity-limits',
		defaultMessage:
			'Shops may use no more than 32 player heads, 64 item frames, and 16 armor stands.',
	},
	shopsRedstone: {
		id: 'rules.market.shops.redstone',
		defaultMessage: 'Redstone is allowed in limited quantity:',
	},
	shopsRedstonePistonDoors: {
		id: 'rules.market.shops.redstone.piston-doors',
		defaultMessage: 'Piston doors',
	},
	shopsRedstoneLighting: {
		id: 'rules.market.shops.redstone.lighting',
		defaultMessage: 'Lighting',
	},
	shopsRedstoneDispensers: {
		id: 'rules.market.shops.redstone.dispensers',
		defaultMessage: 'Simple item dispensers',
	},
	shopsRedstoneNoteBlocks: {
		id: 'rules.market.shops.redstone.note-blocks',
		defaultMessage: 'Small, non-looped note block songs',
	},
	shopsRedstoneNoFarms: {
		id: 'rules.market.shops.redstone.no-farms',
		defaultMessage: 'No farms anywhere in the market area',
	},
	shopsSwitching: {
		id: 'rules.market.shops.switching',
		defaultMessage:
			'To switch to a stall, remove all blocks from your plot first, then open a ticket to notify staff.',
	},
	shopsInvisibleItemFrames: {
		id: 'rules.market.shops.invisible-item-frames',
		defaultMessage: 'Empty invisible item frames may not be used in shops.',
	},
	maintenanceTitle: {
		id: 'rules.market.maintenance.title',
		defaultMessage: 'Maintenance',
	},
	maintenanceSubtitle: {
		id: 'rules.market.maintenance.subtitle',
		defaultMessage: 'Keep your shop active or lose it',
	},
	maintenanceGoodStanding: {
		id: 'rules.market.maintenance.good-standing',
		defaultMessage:
			'To stay in good standing, actively check inventory, collect payments, and/or restock your stall or shop at least once every 30 days.',
	},
	maintenanceInactiveRemoval: {
		id: 'rules.market.maintenance.inactive-removal',
		defaultMessage:
			'If your shop goes inactive for over 30 days it will be removed without notice and your Market Permit will be revoked. All shop contents are donated to spawn.',
	},
	maintenanceReopening: {
		id: 'rules.market.maintenance.reopening',
		defaultMessage:
			'Once a shop is removed or closed, you may reopen by purchasing a new shop permit.',
	},
	ctaTitle: {
		id: 'rules.market.cta.title',
		defaultMessage: 'Ready to set up shop?',
	},
	ctaDescription: {
		id: 'rules.market.cta.description',
		defaultMessage:
			'Grab your Market Permit from Marty at spawn, then claim an open stall or plot. Questions? Open a ticket in our Discord.',
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

const sectionIds = ['overview', 'permits', 'stalls', 'shops', 'maintenance']
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

	code {
		font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
		font-weight: 700;
		color: var(--color-brand);
	}
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
</style>
