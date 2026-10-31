<template>
	<div class="home text-secondary">
		<section class="hero-section">
			<div class="home-container grid items-center gap-14 lg:grid-cols-2">
				<div class="flex min-w-0 flex-col gap-7">
					<div class="flex flex-wrap items-center gap-3">
						<span class="rounded-full bg-brand-highlight px-3 py-1 text-sm font-bold text-brand">
							{{ formatMessage(messages.seasonLabel, { season: SEASON.number }) }}
						</span>
						<span class="font-semibold">
							{{
								formatMessage(hasStarted ? messages.seasonStarted : messages.seasonStarts, {
									date: seasonDate,
								})
							}}
						</span>
					</div>
					<h1 class="main-header">
						<IntlFormatted :message-id="messages.aMinecraftServerFor">
							<template #~content>
								<div class="animate-strong">
									<span>
										<strong
											v-for="[key, message] in Object.entries(contentTypeMessages)"
											:key="`landing-content-type-${key}`"
											class="main-header-strong"
										>
											{{ formatMessage(message) }} <br />
										</strong>
										<strong class="main-header-strong">
											{{ formatMessage(contentTypeMessages.builders) }}
										</strong>
									</span>
								</div>
							</template>
						</IntlFormatted>
					</h1>
					<p class="m-0 max-w-[32rem] text-lg">{{ formatMessage(messages.heroDescription) }}</p>

					<div class="flex max-w-[29rem] flex-col gap-2">
						<span class="eyebrow-muted">{{ formatMessage(messages.serverAddress) }}</span>
						<CopyCode
							:text="SERVER_ADDRESS"
							class="!w-full justify-between !rounded-2xl !px-4 !py-3 !text-base !text-contrast"
						/>
						<div v-if="status" class="flex items-center gap-2 text-sm font-semibold">
							<span
								v-tooltip="formatMessage(status.online ? messages.online : messages.offline)"
								class="size-2.5 rounded-full"
								:class="status.online ? 'bg-green' : 'bg-red'"
							/>
							<span class="text-contrast">
								{{
									status.online
										? formatMessage(messages.playersOnline, { count: status.players })
										: formatMessage(messages.serverOffline)
								}}
							</span>
							<span v-if="status.online && status.version">
								{{ formatMessage(messages.javaEdition, { version: status.version }) }}
							</span>
						</div>
					</div>

					<div class="flex flex-wrap gap-3">
						<ButtonLink type="colored" color="brand" size="xl" :href="DISCORD_URL" target="_blank">
							{{ formatMessage(messages.applyToJoin) }}
							<RightArrowIcon aria-hidden="true" />
						</ButtonLink>
						<ButtonLink size="xl" :href="LIVE_MAP_URL" target="_blank">
							<EarthSearchIcon aria-hidden="true" />
							{{ formatMessage(messages.liveMap) }}
						</ButtonLink>
						<ButtonLink size="xl" to="/discover/shops">
							<StoreIcon aria-hidden="true" />
							{{ formatMessage(messages.shops) }}
						</ButtonLink>
					</div>
				</div>

				<div class="relative overflow-hidden rounded-3xl border border-solid border-surface-5">
					<img
						:src="spawnImage"
						:alt="formatMessage(messages.spawnAlt)"
						fetchpriority="high"
						class="block aspect-[4/3] w-full object-cover"
					/>
					<span
						class="absolute bottom-4 left-4 rounded-xl bg-black/70 px-3 py-2 text-sm font-semibold text-white"
					>
						{{ formatMessage(messages.spawnCaption, { season: SEASON.number }) }}
					</span>
				</div>
			</div>
		</section>

		<section class="home-band">
			<div class="home-container flex flex-col gap-10">
				<div class="flex max-w-[40rem] flex-col gap-2">
					<span class="eyebrow">{{ formatMessage(messages.whyEyebrow) }}</span>
					<h2 class="section-heading">{{ formatMessage(messages.whyHeading) }}</h2>
				</div>
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<div v-for="reason in reasons" :key="reason.title.id" class="home-card">
						<div class="icon-tile">
							<component :is="reason.icon" aria-hidden="true" />
						</div>
						<h3 class="m-0 text-lg font-bold text-contrast">{{ formatMessage(reason.title) }}</h3>
						<p class="m-0 text-base">{{ formatMessage(reason.description) }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="home-section">
			<div class="home-container grid items-center gap-12 lg:grid-cols-2">
				<a
					:href="LIVE_MAP_URL"
					target="_blank"
					class="block overflow-hidden rounded-3xl border border-solid border-surface-5"
				>
					<img
						:src="mapPreviewImage"
						:alt="formatMessage(messages.mapPreviewAlt)"
						class="block aspect-[16/10] w-full object-cover"
					/>
				</a>
				<div class="flex min-w-0 flex-col gap-5">
					<span class="eyebrow">{{ formatMessage(messages.seasonEyebrow) }}</span>
					<h2 class="section-heading">
						{{
							formatMessage(hasStarted ? messages.seasonBegan : messages.seasonBegins, {
								season: SEASON.number,
								date: seasonDate,
							})
						}}
					</h2>
					<p class="m-0 max-w-[36rem] text-lg">{{ formatMessage(messages.seasonDescription) }}</p>
					<div class="flex flex-wrap gap-3">
						<ButtonLink size="xl" :href="LIVE_MAP_URL" target="_blank">
							<EarthSearchIcon aria-hidden="true" />
							{{ formatMessage(messages.openLiveMap) }}
						</ButtonLink>
						<ButtonLink size="xl" to="/downloads">
							<MapArrowDownIcon aria-hidden="true" />
							{{ formatMessage(messages.downloadMaps) }}
						</ButtonLink>
					</div>
				</div>
			</div>
		</section>

		<section class="home-section !pt-0">
			<div class="home-container grid items-center gap-12 lg:grid-cols-2">
				<div class="flex flex-col gap-5">
					<div class="flex flex-col gap-2">
						<span class="eyebrow">{{ formatMessage(messages.competitionEyebrow) }}</span>
						<h2 class="section-heading">{{ formatMessage(messages.competitionHeading) }}</h2>
					</div>
					<p class="m-0 max-w-[40rem] text-lg">
						{{ formatMessage(messages.competitionDescription) }}
					</p>
					<div
						class="flex items-center gap-4 rounded-2xl border border-solid border-surface-5 bg-bg-raised p-4"
					>
						<div class="icon-tile">
							<CrownIcon aria-hidden="true" />
						</div>
						<div v-if="competition" class="flex min-w-0 flex-col">
							<span class="eyebrow-muted">{{ formatMessage(messages.thisWeek) }}</span>
							<span class="text-lg font-bold text-contrast">{{ competition.theme }}</span>
							<span class="text-sm">
								{{ formatMessage(messages.competitionEnds, { date: competitionEndDate }) }}
							</span>
						</div>
						<div v-else class="flex min-w-0 flex-col">
							<span class="text-lg font-bold text-contrast">
								{{ formatMessage(messages.noCompetition) }}
							</span>
							<span class="text-sm">{{ formatMessage(messages.noCompetitionHint) }}</span>
						</div>
					</div>
				</div>

				<div
					class="flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-solid border-surface-5 bg-bg-raised px-6 pt-7"
				>
					<span class="eyebrow-muted">
						{{ formatMessage(lastPodium ? messages.lastPodium : messages.nextPodium) }}
					</span>
					<div class="flex w-full max-w-[29rem] items-end justify-center gap-3">
						<div v-for="step in podium" :key="step.place" class="flex min-w-0 flex-1 flex-col">
							<CrownIcon
								v-if="step.place === 1"
								class="mx-auto mb-2 size-[26px] text-[#f2c14e]"
								aria-hidden="true"
							/>
							<span class="mb-2 truncate text-center font-bold text-contrast">
								{{ step.player ?? '???' }}
							</span>
							<img
								v-if="step.player"
								:src="`/api/skin/${step.player}`"
								:alt="formatMessage(messages.skinAlt, { player: step.player })"
								class="mx-auto -mb-1 block w-auto"
								:style="{ height: step.skinHeight }"
							/>
							<div class="podium-block" :class="`podium-block--${step.place}`">
								{{ step.place }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="home-band">
			<div class="home-container flex flex-col gap-9">
				<div class="flex flex-wrap items-end justify-between gap-5">
					<div class="flex max-w-[38rem] flex-col gap-2">
						<span class="eyebrow">{{ formatMessage(messages.marketEyebrow) }}</span>
						<h2 class="section-heading">{{ formatMessage(messages.marketHeading) }}</h2>
						<p class="m-0 text-lg">{{ formatMessage(messages.marketDescription) }}</p>
					</div>
					<ButtonLink type="colored" color="brand" size="xl" to="/discover/shops">
						{{ formatMessage(messages.browseShops) }}
						<RightArrowIcon aria-hidden="true" />
					</ButtonLink>
				</div>
				<div v-if="shops?.length" class="grid gap-4 md:grid-cols-3">
					<NuxtLink
						v-for="shop in shops"
						:key="shop.project_id"
						:to="`/shop/${shop.slug ?? shop.project_id}`"
						class="home-card home-card--link"
					>
						<div class="flex items-center gap-3">
							<Avatar :src="shop.icon_url" size="56px" :alt="shop.name" />
							<div class="flex min-w-0 flex-col">
								<span class="truncate text-lg font-bold text-contrast">{{ shop.name }}</span>
								<span class="truncate text-sm">
									{{ formatMessage(messages.shopOwner, { owner: shop.author }) }}
								</span>
							</div>
						</div>
						<p class="m-0 line-clamp-2 text-sm">{{ shop.summary }}</p>
					</NuxtLink>
				</div>
				<div
					v-else
					class="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-surface-5 px-6 py-10 text-center"
				>
					<StoreIcon class="size-7" aria-hidden="true" />
					<span class="mt-2 text-lg font-bold text-contrast">
						{{ formatMessage(messages.noShops) }}
					</span>
					<span>{{ formatMessage(messages.noShopsHint) }}</span>
				</div>
			</div>
		</section>

		<section class="home-section">
			<div class="home-container flex flex-col gap-9">
				<div class="flex max-w-[38rem] flex-col gap-2">
					<span class="eyebrow">{{ formatMessage(messages.involvedEyebrow) }}</span>
					<h2 class="section-heading">{{ formatMessage(messages.involvedHeading) }}</h2>
				</div>
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<a :href="DISCORD_URL" target="_blank" class="home-card home-card--link">
						<MessagesSquareIcon class="size-6 text-brand" aria-hidden="true" />
						<span class="text-lg font-bold text-contrast">
							{{ formatMessage(messages.discordTitle) }}
						</span>
						<span>{{ formatMessage(messages.discordDescription) }}</span>
					</a>
					<NuxtLink to="/vote" class="home-card home-card--link">
						<SquareCheckIcon class="size-6 text-brand" aria-hidden="true" />
						<span class="text-lg font-bold text-contrast">
							{{ formatMessage(messages.voteTitle) }}
						</span>
						<span>{{ formatMessage(messages.voteDescription) }}</span>
						<div v-if="topVoters?.length" class="mt-auto flex flex-col items-center gap-2">
							<span class="eyebrow-muted">{{ formatMessage(messages.topVoters) }}</span>
							<div class="flex gap-2">
								<img
									v-for="voter in topVoters"
									:key="voter.uuid"
									v-tooltip="`${voter.username} • ${voter.monthly}`"
									:src="`https://minotar.net/helm/${voter.username}/96.png`"
									:alt="voter.username"
									class="size-10 rounded-lg [image-rendering:pixelated]"
								/>
							</div>
						</div>
					</NuxtLink>
					<NuxtLink to="/rules" class="home-card home-card--link">
						<BookOpenIcon class="size-6 text-brand" aria-hidden="true" />
						<span class="text-lg font-bold text-contrast">
							{{ formatMessage(messages.rulesTitle) }}
						</span>
						<span>{{ formatMessage(messages.rulesDescription) }}</span>
					</NuxtLink>
					<NuxtLink to="/store" class="home-card home-card--link">
						<ShoppingCartIcon class="size-6 text-brand" aria-hidden="true" />
						<span class="text-lg font-bold text-contrast">
							{{ formatMessage(messages.storeTitle) }}
						</span>
						<span>{{ formatMessage(messages.storeDescription) }}</span>
						<div v-if="storeGoal" class="mt-auto flex flex-col gap-2">
							<span class="eyebrow-muted">{{ storeGoal.data.header }}</span>
							<ProgressBar
								:progress="storeGoal.data.percentage / 100"
								:striped="storeGoal.data.bar_style === 'striped'"
								:animated="storeGoal.data.bar_animated"
								full-width
							/>
							<span
								v-if="storeGoal.data.total != null && storeGoal.data.target != null && webstore"
								class="text-sm"
							>
								{{
									formatMessage(messages.storeGoalProgress, {
										raised: price(storeGoal.data.total, webstore.currency),
										target: price(storeGoal.data.target, webstore.currency),
									})
								}}
							</span>
						</div>
					</NuxtLink>
				</div>
			</div>
		</section>

		<section class="home-section !pt-0">
			<div class="home-container">
				<div class="join-panel">
					<div class="flex max-w-[40rem] flex-col gap-2">
						<span class="eyebrow">{{ formatMessage(messages.joinEyebrow) }}</span>
						<h2 class="section-heading">{{ formatMessage(messages.joinHeading) }}</h2>
					</div>
					<ol class="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
						<li v-for="(step, index) in joinSteps" :key="step.title.id" class="flex flex-col gap-2">
							<span class="step-number">{{ index + 1 }}</span>
							<span class="text-lg font-bold text-contrast">{{ formatMessage(step.title) }}</span>
							<span>{{ formatMessage(step.description) }}</span>
						</li>
					</ol>
					<div class="flex flex-wrap gap-3">
						<ButtonLink type="colored" color="brand" size="xl" :href="DISCORD_URL" target="_blank">
							{{ formatMessage(messages.applyOnDiscord) }}
							<RightArrowIcon aria-hidden="true" />
						</ButtonLink>
						<ButtonLink size="xl" to="/rules">
							{{ formatMessage(messages.readRules) }}
						</ButtonLink>
					</div>
					<p class="join-disclaimer">
						<InfoIcon class="mt-0.5 size-[18px] shrink-0" aria-hidden="true" />
						{{ formatMessage(messages.joinDisclaimer) }}
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import {
	BookOpenIcon,
	CalendarIcon,
	CrownIcon,
	EarthSearchIcon,
	HeartHandshakeIcon,
	HistoryIcon,
	InfoIcon,
	MapArrowDownIcon,
	MessagesSquareIcon,
	PickaxeIcon,
	RightArrowIcon,
	ShieldCheckIcon,
	ShoppingCartIcon,
	SquareCheckIcon,
	StoreIcon,
} from '@modrinth/assets'
import {
	Avatar,
	ButtonLink,
	CopyCode,
	defineMessages,
	injectModrinthClient,
	IntlFormatted,
	ProgressBar,
	useVIntl,
} from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'

import mapPreviewImage from '~/assets/images/home/map-preview.webp'
import spawnImage from '~/assets/images/home/spawn.webp'
import { fetchCurrentSeasonShops } from '~/composables/queries/season'
import { storeQueryOptions } from '~/composables/queries/store'
import {
	CURRENT_COMPETITION,
	DISCORD_URL,
	type HomepageCompetition,
	type HomepagePodium,
	LAST_PODIUM,
	LIVE_MAP_URL,
	SEASON,
	SERVER_ADDRESS,
} from '~/helpers/homepage'
import type { ServerStatus } from '~/server/routes/api/server-status.get'
import type { VoteLeaderboardEntry } from '~/server/routes/api/votes.get'

const { formatMessage } = useVIntl()
const client = injectModrinthClient()

useHead({
	link: [{ rel: 'preload', as: 'image', href: spawnImage, fetchpriority: 'high' }],
})

const now = useState('home-now', () => Date.now())
const hasStarted = computed(() => now.value >= Date.parse(SEASON.startsAt))

const monthDay = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	day: 'numeric',
	timeZone: 'UTC',
})
const seasonDate = monthDay.format(new Date(SEASON.startsAt))

const liveCompetition = CURRENT_COMPETITION as HomepageCompetition | null
const competition = computed(() =>
	liveCompetition && Date.parse(liveCompetition.endsAt) > now.value ? liveCompetition : null,
)
const competitionEndDate = computed(() =>
	competition.value ? monthDay.format(new Date(competition.value.endsAt)) : '',
)

const lastPodium = LAST_PODIUM as HomepagePodium | null
const podium = [
	{ place: 2, player: lastPodium?.second ?? null, skinHeight: '170px' },
	{ place: 1, player: lastPodium?.first ?? null, skinHeight: '200px' },
	{ place: 3, player: lastPodium?.third ?? null, skinHeight: '160px' },
]

const { data: status } = useQuery({
	queryKey: ['server-status'],
	queryFn: () => $fetch<ServerStatus>('/api/server-status'),
	staleTime: 60_000,
	retry: false,
})

const { data: voters } = useQuery({
	queryKey: ['home-top-voters', 'month'],
	queryFn: () =>
		$fetch<VoteLeaderboardEntry[]>('/api/votes', { query: { order: 'month', limit: 3 } }),
	retry: false,
})

const topVoters = computed(() => voters.value?.filter((voter) => voter.monthly > 0))

const { data: shops, suspense: shopsSuspense } = useQuery({
	queryKey: ['home-shops'],
	queryFn: () => fetchCurrentSeasonShops(client, { limit: 3, index: 'follows' }),
	retry: false,
})

const storeToken = useStoreToken()
const price = useStorePrice()

const { data: storeModules } = useQuery({
	...storeQueryOptions.sidebar(storeToken, client),
	retry: false,
})
const { data: webstore } = useQuery({
	...storeQueryOptions.webstore(storeToken, client),
	retry: false,
})

const storeGoal = computed(() =>
	storeModules.value?.find(
		(module): module is Extract<typeof module, { type: 'payment_goal' }> =>
			module.type === 'payment_goal',
	),
)

onServerPrefetch(() => shopsSuspense().catch(() => {}))

const messages = defineMessages({
	seasonLabel: {
		id: 'home.season.label',
		defaultMessage: 'Season {season}',
	},
	seasonStarts: {
		id: 'home.season.starts',
		defaultMessage: 'Starts {date}',
	},
	seasonStarted: {
		id: 'home.season.started',
		defaultMessage: 'Started {date}',
	},
	aMinecraftServerFor: {
		id: 'landing.heading.a-minecraft-server-for',
		defaultMessage: 'A Minecraft server for {content}',
	},
	heroDescription: {
		id: 'home.hero.description',
		defaultMessage:
			'An application-only survival server. No plugins that change the game, no pay-to-win. Just a community building, trading and starting fresh each season.',
	},
	serverAddress: {
		id: 'home.hero.server-address',
		defaultMessage: 'Server address',
	},
	online: {
		id: 'home.hero.status-online',
		defaultMessage: 'Online',
	},
	offline: {
		id: 'home.hero.status-offline',
		defaultMessage: 'Offline',
	},
	serverOffline: {
		id: 'home.hero.server-offline',
		defaultMessage: 'Server offline',
	},
	playersOnline: {
		id: 'home.hero.players-online',
		defaultMessage: '{count, plural, one {# player} other {# players}} online',
	},
	javaEdition: {
		id: 'home.hero.java-edition',
		defaultMessage: '· Java Edition {version}',
	},
	applyToJoin: {
		id: 'home.hero.apply',
		defaultMessage: 'Apply to join',
	},
	liveMap: {
		id: 'home.hero.live-map',
		defaultMessage: 'Live map',
	},
	shops: {
		id: 'home.hero.shops',
		defaultMessage: 'Shops',
	},
	spawnAlt: {
		id: 'home.hero.spawn-alt',
		defaultMessage: 'The spawn area on Vanilla Tyme',
	},
	spawnCaption: {
		id: 'home.hero.spawn-caption-season',
		defaultMessage: 'Spawn · Season {season}',
	},
	whyEyebrow: {
		id: 'home.why.eyebrow',
		defaultMessage: 'Why Vanilla Tyme',
	},
	whyHeading: {
		id: 'home.why.heading',
		defaultMessage: 'The game you know, with people worth playing with.',
	},
	pureVanillaTitle: {
		id: 'home.why.pure-vanilla.title',
		defaultMessage: 'Pure vanilla',
	},
	pureVanillaDescription: {
		id: 'home.why.pure-vanilla.description',
		defaultMessage: 'Survival as Mojang made it. Nothing added that changes how the game plays.',
	},
	applicationTitle: {
		id: 'home.why.application.title',
		defaultMessage: 'Application only',
	},
	applicationDescription: {
		id: 'home.why.application.description',
		defaultMessage:
			'Every player is accepted by staff, so your builds are safe and the chat stays friendly.',
	},
	safeTitle: {
		id: 'home.why.safe.title',
		defaultMessage: 'Safe and inclusive',
	},
	safeDescription: {
		id: 'home.why.safe.description',
		defaultMessage:
			'Strict community standards enforced by an active staff team. Zero tolerance for harassment or toxic behavior of any kind.',
	},
	marketTitle: {
		id: 'home.why.market.title',
		defaultMessage: 'Player-run market',
	},
	marketCardDescription: {
		id: 'home.why.market.description',
		defaultMessage:
			'No economy plugin, no admin shops. Our market area at spawn is a real place, built entirely by players from the ground up.',
	},
	sinceTitle: {
		id: 'home.why.since.title',
		defaultMessage: 'Since 2017',
	},
	sinceDescription: {
		id: 'home.why.since.description',
		defaultMessage: 'Ten seasons in, with players who keep coming back every new map.',
	},
	freshTitle: {
		id: 'home.why.fresh.title',
		defaultMessage: 'Fresh seasons',
	},
	freshDescription: {
		id: 'home.why.fresh.description',
		defaultMessage: 'A new world each season. Old maps stay up for download, so nothing is lost.',
	},
	seasonEyebrow: {
		id: 'home.season.eyebrow',
		defaultMessage: 'This season',
	},
	seasonBegins: {
		id: 'home.season.begins',
		defaultMessage: 'Season {season} begins {date}.',
	},
	seasonBegan: {
		id: 'home.season.began',
		defaultMessage: 'Season {season} began {date}.',
	},
	seasonDescription: {
		id: 'home.season.description',
		defaultMessage: 'A brand new world for everyone. Claim your spot early and help shape it.',
	},
	mapPreviewAlt: {
		id: 'home.season.map-preview-alt',
		defaultMessage: 'Overhead view of the Vanilla Tyme world on the live map',
	},
	openLiveMap: {
		id: 'home.season.open-live-map',
		defaultMessage: 'Open the live map',
	},
	downloadMaps: {
		id: 'home.season.download-maps',
		defaultMessage: 'Download past season maps',
	},
	competitionEyebrow: {
		id: 'home.competition.eyebrow',
		defaultMessage: 'Weekly competitions',
	},
	competitionHeading: {
		id: 'home.competition.heading',
		defaultMessage: 'Something to compete for every week',
	},
	competitionDescription: {
		id: 'home.competition.description',
		defaultMessage:
			"Every week players go head-to-head for glory and bragging rights. Building contests, community events, and more — there's always something going on.",
	},
	thisWeek: {
		id: 'home.competition.this-week',
		defaultMessage: 'This week',
	},
	competitionEnds: {
		id: 'home.competition.ends',
		defaultMessage: 'Ends {date}',
	},
	noCompetition: {
		id: 'home.competition.none',
		defaultMessage: 'No competition running right now',
	},
	noCompetitionHint: {
		id: 'home.competition.none-hint',
		defaultMessage: 'The next one will be announced on Discord.',
	},
	lastPodium: {
		id: 'home.competition.last-podium',
		defaultMessage: "Last week's podium",
	},
	nextPodium: {
		id: 'home.competition.next-podium',
		defaultMessage: "Next week's winners",
	},
	skinAlt: {
		id: 'home.competition.skin-alt',
		defaultMessage: "{player}'s Minecraft skin",
	},
	marketEyebrow: {
		id: 'home.market.eyebrow',
		defaultMessage: 'The market',
	},
	marketHeading: {
		id: 'home.market.heading',
		defaultMessage: 'Find what you need, or sell what you make.',
	},
	marketDescription: {
		id: 'home.market.description',
		defaultMessage:
			'Every player can run one shop each season. Search by item to see who sells it and where.',
	},
	browseShops: {
		id: 'home.market.browse',
		defaultMessage: 'Browse all shops',
	},
	shopOwner: {
		id: 'home.market.shop-owner',
		defaultMessage: 'by {owner}',
	},
	noShops: {
		id: 'home.market.empty',
		defaultMessage: 'No shops yet this season',
	},
	noShopsHint: {
		id: 'home.market.empty-hint',
		defaultMessage: 'Shops will show up here once the market opens.',
	},
	involvedEyebrow: {
		id: 'home.involved.eyebrow',
		defaultMessage: 'Get involved',
	},
	involvedHeading: {
		id: 'home.involved.heading',
		defaultMessage: 'More than a server.',
	},
	discordTitle: {
		id: 'home.involved.discord.title',
		defaultMessage: 'Discord',
	},
	discordDescription: {
		id: 'home.involved.discord.description',
		defaultMessage: 'Chat, events and announcements. Applications start here.',
	},
	voteTitle: {
		id: 'home.involved.vote.title',
		defaultMessage: 'Vote',
	},
	voteDescription: {
		id: 'home.involved.vote.description',
		defaultMessage: 'Vote daily to help new players find us.',
	},
	topVoters: {
		id: 'home.involved.vote.top-voters-month',
		defaultMessage: 'Top voters this month',
	},
	rulesTitle: {
		id: 'home.involved.rules.title',
		defaultMessage: 'Rules',
	},
	rulesDescription: {
		id: 'home.involved.rules.description',
		defaultMessage: 'What we expect from every player, in plain words.',
	},
	storeTitle: {
		id: 'home.involved.store.title',
		defaultMessage: 'Store',
	},
	storeDescription: {
		id: 'home.involved.store.description',
		defaultMessage: 'Support the server and keep it running.',
	},
	storeGoalProgress: {
		id: 'home.involved.store.goal-progress',
		defaultMessage: '{raised} of {target}',
	},
	joinEyebrow: {
		id: 'home.join.eyebrow',
		defaultMessage: 'How to join',
	},
	joinHeading: {
		id: 'home.join.heading',
		defaultMessage: 'Three steps to your first night.',
	},
	stepRulesTitle: {
		id: 'home.join.step-rules.title',
		defaultMessage: 'Read the rules',
	},
	stepRulesDescription: {
		id: 'home.join.step-rules.description',
		defaultMessage: 'Read them in full before you apply.',
	},
	stepApplyTitle: {
		id: 'home.join.step-discord-apply.title',
		defaultMessage: 'Join the Discord and apply',
	},
	stepApplyDescription: {
		id: 'home.join.step-discord-apply.description',
		defaultMessage: 'Staff review your application and add you to the server.',
	},
	stepPlayTitle: {
		id: 'home.join.step-play.title',
		defaultMessage: 'Start playing',
	},
	stepPlayDescription: {
		id: 'home.join.step-play.connect',
		defaultMessage: "Once you're accepted, connect to the server and jump in.",
	},
	applyOnDiscord: {
		id: 'home.join.apply',
		defaultMessage: 'Apply on Discord',
	},
	readRules: {
		id: 'home.join.read-rules',
		defaultMessage: 'Read the rules',
	},
	joinDisclaimer: {
		id: 'home.join.disclaimer',
		defaultMessage:
			'All application decisions are final. Staff are not required to share why an application was denied.',
	},
})

const contentTypeMessages = defineMessages({
	builders: {
		id: 'landing.heading.a-minecraft-server-for.builders',
		defaultMessage: 'builders',
	},
	explorers: {
		id: 'landing.heading.a-minecraft-server-for.explorers',
		defaultMessage: 'explorers',
	},
	redstoners: {
		id: 'landing.heading.a-minecraft-server-for.redstoners',
		defaultMessage: 'redstoners',
	},
	friends: {
		id: 'landing.heading.a-minecraft-server-for.friends',
		defaultMessage: 'friends',
	},
	dreamers: {
		id: 'landing.heading.a-minecraft-server-for.dreamers',
		defaultMessage: 'dreamers',
	},
	you: {
		id: 'landing.heading.a-minecraft-server-for.you',
		defaultMessage: 'you',
	},
})

const reasons = [
	{
		icon: PickaxeIcon,
		title: messages.pureVanillaTitle,
		description: messages.pureVanillaDescription,
	},
	{
		icon: ShieldCheckIcon,
		title: messages.applicationTitle,
		description: messages.applicationDescription,
	},
	{
		icon: HeartHandshakeIcon,
		title: messages.safeTitle,
		description: messages.safeDescription,
	},
	{
		icon: StoreIcon,
		title: messages.marketTitle,
		description: messages.marketCardDescription,
	},
	{
		icon: HistoryIcon,
		title: messages.sinceTitle,
		description: messages.sinceDescription,
	},
	{
		icon: CalendarIcon,
		title: messages.freshTitle,
		description: messages.freshDescription,
	},
]

const joinSteps = [
	{ title: messages.stepRulesTitle, description: messages.stepRulesDescription },
	{ title: messages.stepApplyTitle, description: messages.stepApplyDescription },
	{ title: messages.stepPlayTitle, description: messages.stepPlayDescription },
]
</script>

<style lang="scss" scoped>
.home-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1.5rem;
}

.hero-section {
	padding: 4.5rem 0 5.5rem;
}

.home-section {
	padding: 5.5rem 0;
}

.home-band {
	padding: 5rem 0;
	background: var(--color-raised-bg);
	border-block: 1px solid var(--surface-5);

	.home-card {
		background: var(--color-bg);
	}
}

.main-header {
	margin: 0;
	font-size: clamp(2.625rem, 6vw, 4.25rem);
	font-weight: 600;
	line-height: 110%;
	color: var(--landing-color-heading);
}

.main-header-strong {
	font-weight: 600;
	background-color: #5b8cff;
	background-image: linear-gradient(180deg, #a7d0ff 0%, var(--color-brand) 60%);
	background-size: 100%;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;
	color: transparent;
}

.animate-strong {
	height: 1.2em;
	line-height: 120%;
	position: relative;
	overflow: hidden;

	> span {
		position: absolute;
		top: 0;
		left: 0;
		animation: slide 14s infinite;

		@media (prefers-reduced-motion) {
			animation-play-state: paused !important;
		}
	}

	@keyframes slide {
		0%,
		12.5% {
			top: 0;
		}
		14.3%,
		26.8% {
			top: -1.2em;
		}
		28.6%,
		41.1% {
			top: -2.4em;
		}
		42.9%,
		55.4% {
			top: -3.6em;
		}
		57.2%,
		69.7% {
			top: -4.8em;
		}
		71.5%,
		84% {
			top: -6em;
		}
		85.8%,
		98.3% {
			top: -7.2em;
		}
		100% {
			top: -8.4em;
		}
	}
}

.eyebrow {
	font-size: 0.875rem;
	font-weight: 700;
	color: var(--color-brand);
}

.eyebrow-muted {
	font-size: 0.8125rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.section-heading {
	margin: 0;
	font-size: 2.25rem;
	font-weight: 700;
	line-height: 115%;
	color: var(--landing-color-heading);
}

.home-card {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	padding: 1.5rem;
	border-radius: 1rem;
	border: 1px solid var(--surface-5);
	background: var(--color-raised-bg);
	color: inherit;
}

.home-card--link {
	transition: transform 0.15s ease;

	&:hover {
		transform: translateY(-2px);
	}
}

.icon-tile {
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	width: 2.75rem;
	height: 2.75rem;
	border-radius: 0.75rem;
	color: var(--color-brand);
	background: var(--color-brand-highlight);

	svg {
		width: 1.375rem;
		height: 1.375rem;
	}
}

.join-panel {
	display: flex;
	flex-direction: column;
	gap: 2.25rem;
	padding: clamp(1.75rem, 5vw, 3.5rem);
	border-radius: 1.5rem;
	border: 1px solid color-mix(in oklch, var(--color-brand) 22%, transparent);
	background: color-mix(in oklch, var(--color-brand) 6%, transparent);
}

.step-number {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 999px;
	font-weight: 700;
	color: var(--color-accent-contrast);
	background: var(--color-brand);
}

.join-disclaimer {
	display: flex;
	gap: 0.625rem;
	margin: 0;
	padding-top: 1.25rem;
	font-size: 0.875rem;
	border-top: 1px solid color-mix(in oklch, var(--color-brand) 22%, transparent);
}

.podium-block {
	display: flex;
	justify-content: center;
	padding-top: 0.75rem;
	border-radius: 0.5rem 0.5rem 0 0;
	border-top: 10px solid;
	font-weight: 800;
}

.podium-block--1 {
	height: 150px;
	font-size: 2.25rem;
	color: #3d2b04;
	background: #e2ab2f;
	border-color: #f6d06b;
}

.podium-block--2 {
	height: 110px;
	font-size: 1.875rem;
	color: #2b3138;
	background: #aab4be;
	border-color: #d3dae1;
}

.podium-block--3 {
	height: 80px;
	font-size: 1.625rem;
	color: #3a1f0b;
	background: #c27a43;
	border-color: #e09b62;
}
</style>
