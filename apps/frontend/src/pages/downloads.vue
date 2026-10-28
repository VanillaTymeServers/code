<template>
	<div>
		<Teleport to="body">
			<div v-if="expandedMap" class="expanded-map-modal" @click="closeMap">
				<div class="content">
					<img
						v-if="expandedMap.thumbnail"
						class="image"
						:class="{ 'zoomed-in': zoomedIn }"
						:src="expandedMap.thumbnail"
						:alt="formatMessage(expandedMap.name)"
						@click.stop
					/>
					<div class="floating" @click.stop>
						<div class="text">
							<h2>{{ formatMessage(expandedMap.name) }}</h2>
						</div>
						<div class="controls flex gap-2">
							<IconButton :label="formatMessage(messages.closeButton)" @click="closeMap">
								<XIcon aria-hidden="true" />
							</IconButton>
							<IconButton
								v-if="expandedMap.thumbnail"
								:label="formatMessage(messages.openInNewTabButton)"
								@click="openInNewTab(expandedMap.thumbnail)"
							>
								<ExternalIcon aria-hidden="true" />
							</IconButton>
							<IconButton
								:label="formatMessage(zoomedIn ? messages.zoomOutButton : messages.zoomInButton)"
								@click="zoomedIn = !zoomedIn"
							>
								<ContractIcon v-if="zoomedIn" aria-hidden="true" />
								<ExpandIcon v-else aria-hidden="true" />
							</IconButton>
						</div>
					</div>
				</div>
			</div>
		</Teleport>
		<div class="landing-hero">
			<h1 class="main-header">{{ formatMessage(messages.heroTitle) }}</h1>
			<h2 class="main-subheader">{{ formatMessage(messages.heroSubtitle) }}</h2>
		</div>
		<div class="new-page sidebar alt-layout">
			<aside class="normal-page__sidebar">
				<SearchSidebarFilter
					v-model:selected-filters="selectedFilters"
					v-model:toggled-groups="toggledGroups"
					:filter-type="serverFilter"
					project-type="map"
					:provided-filters="[]"
					class="card-shadow rounded-2xl border border-solid border-surface-4 bg-surface-3"
					button-class="button-animation flex flex-col gap-1 px-4 py-3 w-full bg-transparent cursor-pointer border-none"
					content-class="mb-4 mx-3"
					inner-panel-class="p-1"
					open-by-default
				>
					<template #header>
						<h3 class="m-0 text-base font-semibold">{{ serverFilter.formatted_name }}</h3>
					</template>
				</SearchSidebarFilter>
			</aside>
			<section class="normal-page__content mb-16">
				<p v-if="filteredMaps.length === 0" class="m-0 text-secondary">
					{{ formatMessage(messages.noResults) }}
				</p>
				<div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div
						v-for="map in filteredMaps"
						:key="map.id"
						class="flex flex-col overflow-hidden rounded-2xl bg-bg-raised"
					>
						<img
							v-if="map.thumbnail"
							:src="map.thumbnail"
							:alt="formatMessage(map.name)"
							loading="lazy"
							class="aspect-video w-full cursor-pointer object-cover"
							@click="openMap(map)"
						/>
						<div
							v-else
							class="flex aspect-video w-full items-center justify-center bg-surface-3 text-secondary"
						>
							<ImageIcon class="size-12" aria-hidden="true" />
						</div>
						<div class="flex flex-1 flex-col gap-4 p-4">
							<h2 class="m-0 text-xl font-bold text-contrast">{{ formatMessage(map.name) }}</h2>
							<div class="mt-auto flex gap-2">
								<Button v-if="map.thumbnail" @click="openMap(map)">
									<EyeIcon aria-hidden="true" />
									{{ formatMessage(messages.viewButton) }}
								</Button>
								<ButtonLink type="colored" color="brand" :href="map.downloadUrl" target="_blank">
									<DownloadIcon aria-hidden="true" />
									{{ formatMessage(messages.downloadButton) }}
								</ButtonLink>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	ContractIcon,
	DownloadIcon,
	ExpandIcon,
	ExternalIcon,
	EyeIcon,
	ImageIcon,
	XIcon,
} from '@modrinth/assets'
import type { FilterType, FilterValue } from '@modrinth/ui'
import {
	Button,
	ButtonLink,
	defineMessages,
	IconButton,
	SearchSidebarFilter,
	useVIntl,
} from '@modrinth/ui'
import { onKeyStroke } from '@vueuse/core'

type MapServer = 'vt' | 'svt' | 'plots'

const { formatMessage } = useVIntl()

const messages = defineMessages({
	heroTitle: {
		id: 'downloads.hero.title',
		defaultMessage: 'Map Downloads',
	},
	heroSubtitle: {
		id: 'downloads.hero.subtitle',
		defaultMessage:
			'Download world saves from all of our servers and explore the (almost) full history of Vanilla Tyme',
	},
	downloadButton: {
		id: 'downloads.download-button',
		defaultMessage: 'Download',
	},
	noResults: {
		id: 'downloads.no-results',
		defaultMessage: 'No results found.',
	},
	viewButton: {
		id: 'downloads.view-button',
		defaultMessage: 'View',
	},
	closeButton: {
		id: 'downloads.viewer.close',
		defaultMessage: 'Close',
	},
	openInNewTabButton: {
		id: 'downloads.viewer.open-in-new-tab',
		defaultMessage: 'Open in new tab',
	},
	zoomInButton: {
		id: 'downloads.viewer.zoom-in',
		defaultMessage: 'Zoom in',
	},
	zoomOutButton: {
		id: 'downloads.viewer.zoom-out',
		defaultMessage: 'Zoom out',
	},
	serverFilterTitle: {
		id: 'downloads.filter.server',
		defaultMessage: 'Server',
	},
	serverVanillaTyme: {
		id: 'downloads.filter.server.vt',
		defaultMessage: 'Vanilla Tyme',
	},
	serverSemiVanillaTyme: {
		id: 'downloads.filter.server.svt',
		defaultMessage: 'Semi-Vanilla Tyme',
	},
	serverCreativePlots: {
		id: 'downloads.filter.server.plots',
		defaultMessage: 'Creative Plots',
	},
	mapSeason1: { id: 'downloads.map.vt1', defaultMessage: 'Season 1' },
	mapSeason3: { id: 'downloads.map.vt3', defaultMessage: 'Season 3' },
	mapSeason4: { id: 'downloads.map.vt4', defaultMessage: 'Season 4' },
	mapSeason5: { id: 'downloads.map.vt5', defaultMessage: 'Season 5' },
	mapSeason6: { id: 'downloads.map.vt6', defaultMessage: 'Season 6' },
	mapSeason7: { id: 'downloads.map.vt7', defaultMessage: 'Season 7' },
	mapSeason8: { id: 'downloads.map.vt8', defaultMessage: 'Season 8' },
	mapSeason9: { id: 'downloads.map.vt9', defaultMessage: 'Season 9' },
	mapCreativePlots: { id: 'downloads.map.plots1', defaultMessage: 'Creative Plots' },
	mapSemiSeason1: { id: 'downloads.map.svt1', defaultMessage: 'Semi-Vanilla Season 1' },
	mapSemiSeason2: { id: 'downloads.map.svt2', defaultMessage: 'Semi-Vanilla Season 2' },
})

useSeoMeta({
	title: () => formatMessage(messages.heroTitle),
	description: () => formatMessage(messages.heroSubtitle),
	ogTitle: () => formatMessage(messages.heroTitle),
	ogDescription: () => formatMessage(messages.heroSubtitle),
})

const CDN = 'https://cdn.vanillatyme.com/maps'

const maps = [
	{
		id: 'vt1',
		name: messages.mapSeason1,
		server: 'vt',
		thumbnail: `${CDN}/vt1/thumbnail.jpg`,
		downloadUrl: 'https://drive.google.com/file/d/1vNyY84ew2idTiNix2p4KW8ZgkzTo3EkF/view',
	},
	{
		id: 'vt3',
		name: messages.mapSeason3,
		server: 'vt',
		thumbnail: `${CDN}/vt3/thumbnail.png`,
		downloadUrl: 'https://drive.google.com/file/d/1SPUhREr8H0xohDhAySpnfd9pr54dpelT/view',
	},
	{
		id: 'vt4',
		name: messages.mapSeason4,
		server: 'vt',
		thumbnail: `${CDN}/vt4/thumbnail.png`,
		downloadUrl: 'https://drive.google.com/file/d/1lqVAdVV_raZTSqDzjGGfzI4_Rgub0beC/view',
	},
	{
		id: 'vt5',
		name: messages.mapSeason5,
		server: 'vt',
		thumbnail: 'https://s3.us-east-1.amazonaws.com/cdn.vanillatyme.com/maps/vt5/thumbnail.png',
		downloadUrl: 'https://drive.google.com/file/d/1DPhrjaIs5NM1dmicNJWmjXAdovdCKkUE/view',
	},
	{
		id: 'vt6',
		name: messages.mapSeason6,
		server: 'vt',
		thumbnail: `${CDN}/vt6/thumbnail.png`,
		downloadUrl: 'https://drive.google.com/file/d/1bZ2zjc8Q-B35lyzRiZY6U8Fmi2J5K9sL/view',
	},
	{
		id: 'vt7',
		name: messages.mapSeason7,
		server: 'vt',
		thumbnail: 'https://s3.us-east-1.amazonaws.com/cdn.vanillatyme.com/maps/vt7/thumbnail.png',
		downloadUrl: 'https://drive.google.com/file/d/1DVJvaBaOsgzQKf2HhpnzAE-VqGNAwb70/view',
	},
	{
		id: 'vt8',
		name: messages.mapSeason8,
		server: 'vt',
		thumbnail: `${CDN}/vt8/thumbnail.png`,
		downloadUrl: 'https://drive.google.com/file/d/1Q5i7RxVTuSMqQpida6wJNf7FZGmN_OyT/view',
	},
	{
		id: 'vt9',
		name: messages.mapSeason9,
		server: 'vt',
		thumbnail: `${CDN}/vt9/thumbnail.png`,
		downloadUrl: 'https://drive.google.com/file/d/1z-WRUv9zrZDC5N2UN6WLSSDWGiMZk01m/view',
	},
	{
		id: 'plots1',
		name: messages.mapCreativePlots,
		server: 'plots',
		thumbnail: `${CDN}/plots1/thumbnail.png`,
		downloadUrl: 'https://drive.google.com/file/d/1gqfG5TiNokLQgVR6FapoECMbi5nE1zzR/view',
	},
	{
		id: 'svt1',
		name: messages.mapSemiSeason1,
		server: 'svt',
		thumbnail: undefined,
		downloadUrl: 'https://drive.google.com/file/d/1l__L1Flgi1pIDXC0PQbTiQH3QR3n9cWn/view',
	},
	{
		id: 'svt2',
		name: messages.mapSemiSeason2,
		server: 'svt',
		thumbnail: undefined,
		downloadUrl: 'https://drive.google.com/file/d/1aWoBs94aEdVKILhHCUFEpSNhX29CWI2Y/view',
	},
] satisfies {
	id: string
	name: (typeof messages)[keyof typeof messages]
	server: MapServer
	thumbnail: string | undefined
	downloadUrl: string
}[]
const selectedFilters = ref<FilterValue[]>([])
const toggledGroups = ref<string[]>([])

const serverFilter = computed<FilterType>(() => ({
	id: 'server',
	formatted_name: formatMessage(messages.serverFilterTitle),
	options: [
		{
			id: 'vt',
			formatted_name: formatMessage(messages.serverVanillaTyme),
			method: 'or',
			value: 'vt',
		},
		{
			id: 'svt',
			formatted_name: formatMessage(messages.serverSemiVanillaTyme),
			method: 'or',
			value: 'svt',
		},
		{
			id: 'plots',
			formatted_name: formatMessage(messages.serverCreativePlots),
			method: 'or',
			value: 'plots',
		},
	],
	supported_project_types: [],
	query_param: 'server',
	supports: ['include'],
	searchable: false,
	display: 'all',
}))

const filteredMaps = computed(() => {
	const activeServers = selectedFilters.value
		.filter((filter) => filter.type === 'server' && !filter.negative)
		.map((filter) => filter.option)

	return activeServers.length === 0
		? maps
		: maps.filter((map) => activeServers.includes(map.server))
})
type WorldMap = (typeof maps)[number]

const expandedMap = ref<WorldMap | null>(null)
const zoomedIn = ref(false)

function openMap(map: WorldMap) {
	zoomedIn.value = false
	expandedMap.value = map
}

function closeMap() {
	expandedMap.value = null
}

function openInNewTab(url: string) {
	window.open(url, '_blank', 'noopener')
}

onKeyStroke('Escape', closeMap)
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

	.main-subheader {
		font-size: 1.625rem;
		line-height: 125%;
		margin: 0 0 1.625rem;
		font-weight: 400;
		color: var(--landing-color-subheading);
		max-width: 1096px;
	}
}

.main-header {
	font-size: 5.25rem;
	font-weight: 600;
	line-height: 100%;
	margin: 2rem 0;

	@media screen and (max-width: 1024px) {
		font-size: 4rem;
	}

	@media screen and (max-width: 746px) {
		font-size: 3rem;
	}
}
.expanded-map-modal {
	position: fixed;
	z-index: 20;
	overflow: auto;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;

	.content {
		position: relative;
		width: calc(100vw - 2 * var(--spacing-card-lg));
		height: calc(100vh - 2 * var(--spacing-card-lg));
	}

	.image {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		max-width: calc(100vw - 2 * var(--spacing-card-lg));
		max-height: calc(100vh - 2 * var(--spacing-card-lg));
		border-radius: var(--size-rounded-card);

		&.zoomed-in {
			object-fit: cover;
			width: auto;
			height: calc(100vh - 2 * var(--spacing-card-lg));
		}
	}

	.floating {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: var(--spacing-card-md);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-card-sm);
		transition: opacity 0.25s ease-in-out;
		padding: 2rem 2rem 0;

		&:not(:hover) {
			opacity: 0.4;

			.text {
				transform: translateY(2.5rem) scale(0.8);
				opacity: 0;
			}

			.controls {
				transform: translateY(0.25rem) scale(0.9);
			}
		}

		.text {
			display: flex;
			flex-direction: column;
			max-width: 40rem;
			margin-bottom: 0.25rem;
			text-shadow: 1px 1px 10px #000000d4;
			transition:
				opacity 0.25s ease-in-out,
				transform 0.25s ease-in-out;

			h2 {
				margin: 0;
				font-size: 1.25rem;
				text-align: center;
				color: var(--dark-color-text-dark);
			}
		}

		.controls {
			background-color: var(--color-raised-bg);
			padding: var(--spacing-card-md);
			border-radius: var(--size-rounded-card);
			transition:
				opacity 0.25s ease-in-out,
				transform 0.25s ease-in-out;
		}
	}
}
</style>
