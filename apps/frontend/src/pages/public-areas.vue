<template>
	<div>
		<div class="landing-hero">
			<h1 class="main-header">
				{{ formatMessage(messages.heroTitleLine1) }} <br />
				{{ formatMessage(messages.heroTitleLine2, { season: SEASON.number }) }}
			</h1>
			<h2 class="main-subheader">{{ formatMessage(messages.heroSubtitle) }}</h2>
			<div class="flex flex-wrap justify-center gap-3">
				<ButtonLink type="colored" color="brand" size="lg" :href="LIVE_MAP_URL" target="_blank">
					<EarthSearchIcon aria-hidden="true" />
					{{ formatMessage(messages.openMap) }}
				</ButtonLink>
				<ButtonLink type="outlined" size="lg" to="/rules">
					{{ formatMessage(messages.readRules) }}
				</ButtonLink>
			</div>
		</div>

		<section class="areas-section mx-auto mb-16 flex flex-col gap-6">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div
					v-for="area in areas"
					:key="area.id"
					class="flex flex-col gap-4 rounded-2xl bg-bg-raised p-6"
				>
					<div class="flex items-center gap-2">
						<component :is="area.icon" class="h-6 w-6 text-contrast" aria-hidden="true" />
						<h3 class="m-0 text-xl font-bold text-contrast">{{ formatMessage(area.name) }}</h3>
					</div>
					<div class="flex flex-wrap gap-1.5">
						<span
							v-for="resource in area.resources"
							:key="resource.id"
							class="rounded-full bg-button-bg px-2.5 py-0.5 text-xs font-semibold text-secondary"
						>
							{{ formatMessage(resource) }}
						</span>
					</div>
					<div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-sm">
						<span class="text-secondary">{{ formatMessage(messages.netherHub) }}</span>
						<span v-if="area.hub" class="text-base font-bold text-brand">
							{{ formatMessage(messages.hubDirection, area.hub) }}
						</span>
						<span v-else class="font-medium text-secondary">
							{{ formatMessage(messages.portalComingSoon) }}
						</span>
						<span class="text-secondary">{{ formatMessage(messages.overworld) }}</span>
						<span
							class="w-fit rounded-lg bg-button-bg px-2.5 py-1 font-mono font-semibold text-contrast"
						>
							{{ area.x }}, {{ area.y ?? '~' }}, {{ area.z }}
						</span>
					</div>
					<ButtonLink :href="mapUrl(area)" target="_blank" class="!w-fit">
						<MapPinIcon aria-hidden="true" />
						{{ formatMessage(messages.viewOnMap) }}
					</ButtonLink>
				</div>
			</div>
			<div class="rounded-2xl bg-bg-raised p-6">
				<div class="flex flex-col gap-2 text-center">
					<h3 class="m-0 text-lg font-bold">{{ formatMessage(messages.gettingThereTitle) }}</h3>
					<p class="m-0 text-sm leading-relaxed">
						{{ formatMessage(messages.gettingThereDescription) }}
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import {
	CastleIcon,
	EarthSearchIcon,
	LeafIcon,
	MapPinIcon,
	MountainIcon,
	ShellIcon,
	SnowflakeIcon,
	SproutIcon,
	TreesIcon,
} from '@modrinth/assets'
import { ButtonLink, defineMessages, useVIntl } from '@modrinth/ui'
import type { Component } from 'vue'

import { LIVE_MAP_URL, SEASON } from '~/helpers/homepage'

type HubDirection = 'north' | 'south' | 'east' | 'west'

interface Message {
	id: string
	defaultMessage: string
}

interface PublicArea {
	id: string
	name: Message
	icon: Component
	resources: Message[]
	x: number
	y?: number
	z: number
	/** Leave null until the portal is built. */
	hub: { direction: HubDirection; distance: number } | null
}

const { formatMessage } = useVIntl()

const messages = defineMessages({
	seoTitle: {
		id: 'public-areas.seo.title',
		defaultMessage: 'Public areas - Vanilla Tyme SMP',
	},
	seoDescription: {
		id: 'public-areas.seo.description',
		defaultMessage: 'Biomes claimed for every Vanilla Tyme player to gather resources from.',
	},
	heroTitleLine1: {
		id: 'public-areas.hero.title-line-1',
		defaultMessage: 'Public areas',
	},
	heroTitleLine2: {
		id: 'public-areas.hero.title-line-2',
		defaultMessage: 'Season {season}',
	},
	heroSubtitle: {
		id: 'public-areas.hero.subtitle',
		defaultMessage: 'Biomes claimed for everyone to gather resources from.',
	},
	openMap: {
		id: 'public-areas.hero.open-map',
		defaultMessage: 'Open the map',
	},
	readRules: {
		id: 'public-areas.hero.read-rules',
		defaultMessage: 'Read the rules',
	},
	netherHub: {
		id: 'public-areas.card.nether-hub',
		defaultMessage: 'Nether hub',
	},
	overworld: {
		id: 'public-areas.card.overworld',
		defaultMessage: 'Overworld',
	},
	hubDirection: {
		id: 'public-areas.card.hub-direction',
		defaultMessage:
			'{direction, select, north {North} south {South} east {East} west {West} other {}} {distance}',
	},
	portalComingSoon: {
		id: 'public-areas.card.portal-coming-soon',
		defaultMessage: 'Portal coming soon',
	},
	viewOnMap: {
		id: 'public-areas.card.view-on-map',
		defaultMessage: 'View on map',
	},
	gettingThereTitle: {
		id: 'public-areas.getting-there.title',
		defaultMessage: 'Getting there',
	},
	gettingThereDescription: {
		id: 'public-areas.getting-there.description',
		defaultMessage:
			'From the nether hub, follow the listed main tunnel that many blocks and take the portal up.',
	},
	stronghold: {
		id: 'public-areas.area.stronghold',
		defaultMessage: 'Stronghold',
	},
	desertMesa: {
		id: 'public-areas.area.desert-mesa',
		defaultMessage: 'Desert and mesa',
	},
	coralReef: {
		id: 'public-areas.area.coral-reef',
		defaultMessage: 'Coral reef',
	},
	mangroveSwamp: {
		id: 'public-areas.area.mangrove-swamp',
		defaultMessage: 'Mangrove and swamp',
	},
	paleGarden: {
		id: 'public-areas.area.pale-garden',
		defaultMessage: 'Pale garden',
	},
	iceSpikes: {
		id: 'public-areas.area.ice-spikes',
		defaultMessage: 'Ice spikes and frozen river',
	},
	mushroomIsland: {
		id: 'public-areas.area.mushroom-island',
		defaultMessage: 'Mushroom island',
	},
	resourceEndPortal: {
		id: 'public-areas.resource.end-portal',
		defaultMessage: 'End portal',
	},
	resourceSand: {
		id: 'public-areas.resource.sand',
		defaultMessage: 'Sand',
	},
	resourceRedSand: {
		id: 'public-areas.resource.red-sand',
		defaultMessage: 'Red sand',
	},
	resourceTerracotta: {
		id: 'public-areas.resource.terracotta',
		defaultMessage: 'Terracotta',
	},
	resourceCactus: {
		id: 'public-areas.resource.cactus',
		defaultMessage: 'Cactus',
	},
	resourceCoral: {
		id: 'public-areas.resource.coral',
		defaultMessage: 'Coral',
	},
	resourceSeaPickles: {
		id: 'public-areas.resource.sea-pickles',
		defaultMessage: 'Sea pickles',
	},
	resourceKelp: {
		id: 'public-areas.resource.kelp',
		defaultMessage: 'Kelp',
	},
	resourceMangroveWood: {
		id: 'public-areas.resource.mangrove-wood',
		defaultMessage: 'Mangrove wood',
	},
	resourceMud: {
		id: 'public-areas.resource.mud',
		defaultMessage: 'Mud',
	},
	resourceFrogs: {
		id: 'public-areas.resource.frogs',
		defaultMessage: 'Frogs',
	},
	resourcePaleOakWood: {
		id: 'public-areas.resource.pale-oak-wood',
		defaultMessage: 'Pale oak wood',
	},
	resourcePaleMoss: {
		id: 'public-areas.resource.pale-moss',
		defaultMessage: 'Pale moss',
	},
	resourceCreakingHeart: {
		id: 'public-areas.resource.creaking-heart',
		defaultMessage: 'Creaking heart',
	},
	resourcePackedIce: {
		id: 'public-areas.resource.packed-ice',
		defaultMessage: 'Packed ice',
	},
	resourceSnow: {
		id: 'public-areas.resource.snow',
		defaultMessage: 'Snow',
	},
	resourceIce: {
		id: 'public-areas.resource.ice',
		defaultMessage: 'Ice',
	},
	resourceMycelium: {
		id: 'public-areas.resource.mycelium',
		defaultMessage: 'Mycelium',
	},
	resourceMooshrooms: {
		id: 'public-areas.resource.mooshrooms',
		defaultMessage: 'Mooshrooms',
	},
	resourceMushroomBlocks: {
		id: 'public-areas.resource.mushroom-blocks',
		defaultMessage: 'Mushroom blocks',
	},
})

useSeoMeta({
	title: () => formatMessage(messages.seoTitle),
	description: () => formatMessage(messages.seoDescription),
	ogTitle: () => formatMessage(messages.seoTitle),
	ogDescription: () => formatMessage(messages.seoDescription),
})

const areas: PublicArea[] = [
	{
		id: 'stronghold',
		name: messages.stronghold,
		icon: CastleIcon,
		resources: [messages.resourceEndPortal],
		x: 1524,
		z: 372,
		hub: null,
	},
	{
		id: 'desert-mesa',
		name: messages.desertMesa,
		icon: MountainIcon,
		resources: [
			messages.resourceSand,
			messages.resourceRedSand,
			messages.resourceTerracotta,
			messages.resourceCactus,
		],
		x: 6,
		y: 88,
		z: 2686,
		hub: null,
	},
	{
		id: 'coral-reef',
		name: messages.coralReef,
		icon: ShellIcon,
		resources: [messages.resourceCoral, messages.resourceSeaPickles, messages.resourceKelp],
		x: 6,
		y: 88,
		z: 2686,
		hub: null,
	},
	{
		id: 'mangrove-swamp',
		name: messages.mangroveSwamp,
		icon: TreesIcon,
		resources: [messages.resourceMangroveWood, messages.resourceMud, messages.resourceFrogs],
		x: 2000,
		y: 64,
		z: -2140,
		hub: null,
	},
	{
		id: 'pale-garden',
		name: messages.paleGarden,
		icon: LeafIcon,
		resources: [
			messages.resourcePaleOakWood,
			messages.resourcePaleMoss,
			messages.resourceCreakingHeart,
		],
		x: 854,
		y: 103,
		z: 17,
		hub: null,
	},
	{
		id: 'ice-spikes',
		name: messages.iceSpikes,
		icon: SnowflakeIcon,
		resources: [messages.resourceIce, messages.resourcePackedIce, messages.resourceSnow],
		x: 4470,
		y: 68,
		z: -670,
		hub: null,
	},
	{
		id: 'mushroom-island',
		name: messages.mushroomIsland,
		icon: SproutIcon,
		resources: [
			messages.resourceMycelium,
			messages.resourceMooshrooms,
			messages.resourceMushroomBlocks,
		],
		x: 7733,
		y: 64,
		z: -1550,
		hub: null,
	},
]

function mapUrl(area: PublicArea): string {
	return `${LIVE_MAP_URL}/#Season${SEASON.number}:${area.x}:${area.y ?? 64}:${area.z}:150:0:0:0:1:flat`
}
</script>

<style scoped lang="scss">
.landing-hero {
	position: relative;
	padding: 6rem 1rem;
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
	margin: 2rem 0;
}

.areas-section {
	width: min(calc(100% - 2rem), 1096px);
}
</style>
