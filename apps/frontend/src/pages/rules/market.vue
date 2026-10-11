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
						label: 'Overview',
						action: () => scrollToSection('overview'),
					},
					{
						label: 'Market Permits',
						action: () => scrollToSection('permits'),
					},
					{
						label: 'Stalls',
						action: () => scrollToSection('stalls'),
					},
					{
						label: 'Shops',
						action: () => scrollToSection('shops'),
					},
					{
						label: 'Maintenance',
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
							<IconSparkle2 />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Overview
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)"
								>How the market works</span
							>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						Choose between a pre-built stall or a blank plot to build your own shop. The full
						process is below.
					</li>
					<li>No player may have a stall and a shop at the same time.</li>
					<li>
						You can share a shop with other players — but no player may be part of more than one
						shop or stall at a time. Each player needs their own permit.
					</li>
					<li>
						Display your shop's currency on a sign so pricing is clear. You can request any payment
						(diamonds, iron, etc.) as long as it's clearly marked and consistent.
					</li>
				</ol>
				<MessageBanner class="mx-4">
					<strong class="text-brand">Currency sign examples</strong>
					<div class="examples">
						<span class="chip">
							<code>{{ '<>' }}</code> = diamond</span
						>
						<span class="chip"> <code>d</code> = diamond</span>
						<span class="chip"> <code>[ ]</code> = diamond block</span>
						<span class="chip"> <code>[ ]</code> = a slot</span>
					</div>
				</MessageBanner>
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
							<IconLicense />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Market Permits
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Required for every shop or stall member
							</span>
						</div>
					</div>
				</template>
				<MessageBanner class="mx-4">
					<strong class="text-brand">Marty the Market Master</strong>
					sells permits at the permit office located in spawn
					<span class="text-brand">x0 z-116</span> for
					<span class="text-brand">2 diamond blocks</span> each.
				</MessageBanner>
				<ol class="mx-4">
					<li>
						Every shop/stall member must buy and display their own Market Permit, visible in the
						stall/shop immediately after claiming.
					</li>
					<li>
						To switch between a stall and a plot, fully vacate your current spot first, open a
						ticket to notify staff, and move your permit to the new spot.
					</li>
					<li>You may not give away or sell your permit to any player.</li>
					<li>Each player must purchase their own permit.</li>
					<li>Permits should not be renamed.</li>
					<li>Don't remove or move the permit of any shop/stall you're not a member of.</li>
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
							<IconShoppingCart />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Stalls
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Pre-built & ready to sell — first come, first served
							</span>
						</div>
					</div>
				</template>
				<div class="facts mx-4">
					<div class="fact">
						<div class="fact-value">16</div>
						<div class="fact-label">stalls available</div>
					</div>
					<div class="fact">
						<div class="fact-value">10</div>
						<div class="fact-label">max barrels/chests</div>
					</div>
				</div>
				<ol class="mx-4">
					<li>
						To claim a stall, replace the vacant sign with your in-game name and the date you
						claimed. You must obtain a Market Permit first and display it immediately. If none are
						open, you'll have to wait — availability isn't guaranteed.
					</li>
					<li>
						Each stall may have a maximum of 10 barrels/chests (a double chest counts as 2). You may
						not add more.
					</li>
					<li>
						You may add signs, banners, and up to 3 decorative player heads to promote your stall.
						Decorations must be attached to the stall.
					</li>
					<li>
						You may rearrange the barrels and chests, but you may not remove, add, or swap out any
						of the stall's blocks.
					</li>
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
							<IconBuildingStore />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Shops
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Build your own on a blank 20&times;20 plot
							</span>
						</div>
					</div>
				</template>
				<div class="facts mx-4">
					<div class="fact">
						<div class="fact-value">20&times;20</div>
						<div class="fact-label">plot size</div>
					</div>
					<div class="fact">
						<div class="fact-value">40</div>
						<div class="fact-label">max build height</div>
					</div>
					<div class="fact">
						<div class="fact-value">10</div>
						<div class="fact-label">max depth below floor</div>
					</div>
				</div>
				<ol class="mx-4">
					<li>
						All plot locations are clearly marked with concrete at the corners. You may not create
						your own plot.
					</li>
					<li>
						To claim a plot, replace the vacant sign with your in-game name and the date you
						claimed. Obtain a Market Permit first and display it immediately. If none are open,
						you'll have to wait.
					</li>
					<li>
						All plots are 20&times;20 blocks. Only banners, trapdoors, buttons, and signs may
						overhang the plot.
					</li>
					<li>
						Max build height is 40 blocks above natural ground level. Builds may descend up to 10
						blocks below your floor level.
					</li>
					<li>Minimal terraforming of the ground is allowed.</li>
					<li>All shops must be lit so mobs cannot spawn — including roofs.</li>
					<li>Shops may use no more than 32 player heads, 64 item frames, and 16 armor stands.</li>
					<li>
						Redstone is allowed in limited quantity:
						<ul>
							<li>Piston doors</li>
							<li>Lighting</li>
							<li>Simple item dispensers</li>
							<li>Small, non-looped note block songs</li>
							<li>No farms anywhere in the market area</li>
						</ul>
					</li>
					<li>
						To switch to a stall, remove all blocks from your plot first, then open a ticket to
						notify staff.
					</li>
					<li>Empty invisible item frames may not be used in shops.</li>
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
							<IconTool />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								Maintenance
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								Keep your shop active or lose it
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						To stay in good standing, actively check inventory, collect payments, and/or restock
						your stall or shop at least once every 30 days.
					</li>
					<li>
						If your shop goes inactive for over 30 days it will be removed without notice and your
						Market Permit will be revoked. All shop contents are donated to spawn.
					</li>
					<li>Once a shop is removed or closed, you may reopen by purchasing a new shop permit.</li>
				</ol>
			</Accordion>
		</div>
		<div class="rules-cta mt-10">
			<h2 class="rules-cta__title">Ready to set up shop?</h2>
			<p class="rules-cta__subtitle">
				Grab your Market Permit from Marty at spawn, then claim an open stall or plot. Questions?
				Open a ticket in our Discord.
			</p>
			<ButtonLink
				external
				type="colored-text"
				color="brand"
				size="lg"
				target="_blank"
				href="https://discord.com/channels/304066050201485322/950596143258165288"
				rel="noopener"
			>
				Open a ticket
				<ChevronRightIcon aria-hidden="true" />
			</ButtonLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
// import {
//     IconBuildingStore,
//     IconChevronRight,
//     IconLicense,
//     IconShoppingCart,
//     IconSparkle2,
//     IconTool,
// } from "@tabler/icons-vue";

import { ChevronRightIcon } from '@modrinth/assets'
import { Accordion, ButtonLink } from '@modrinth/ui'

// import ButtonStyled from "~/components/modrinth/ui/base/ButtonStyled.vue";
import MessageBanner from '~/components/ui/MessageBanner.vue'
import NavStack from '~/components/ui/NavStack.vue'

definePageMeta({
	hero: {
		pre: 'Market',
		accent: 'Rules',
		subtitle:
			'Every approved player can buy or sell almost anything in our market area within Spawn.',
		badge: {
			text: 'Season 10',
			variant: 'brand',
			icon: 'store',
		},
	},
})
function scrollToSection(id: string) {
	const el = document.getElementById(id)
	if (!el) return
	const top = el.getBoundingClientRect().top + window.scrollY - 16
	window.scrollTo({ top, behavior: 'smooth' })
}

const sectionIds = ['overview', 'permits', 'stalls', 'shops', 'maintenance']
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
</style>
