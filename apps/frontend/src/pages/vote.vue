<template>
	<div>
		<div class="landing-hero">
			<h1 class="main-header">
				{{ formatMessage(messages.heroTitleLine1) }} <br />
				{{ formatMessage(messages.heroTitleLine2) }}
			</h1>
			<h2 class="main-subheader">{{ formatMessage(messages.heroSubtitle) }}</h2>
			<div class="flex flex-wrap justify-center gap-3">
				<Button type="colored" color="brand" size="lg" @click="scrollToVoteSites">
					<SquareCheckIcon aria-hidden="true" />
					{{ formatMessage(messages.voteButton) }}
				</Button>
				<Button type="outlined" size="lg" @click="scrollToLeaderboard">
					{{ formatMessage(messages.leaderboardButton) }}
				</Button>
			</div>
			<section ref="voteSiteSection" class="mt-6 w-full">
				<h1>{{ formatMessage(messages.voteLinksTitle) }}</h1>
				<div class="vote-section mx-auto flex flex-wrap justify-center gap-4">
					<ButtonLink
						v-for="site in voteSites"
						:key="site.id"
						:href="site.url"
						target="_blank"
						size="xl"
						class="!h-auto !rounded-2xl !bg-bg-raised !px-6 !py-4"
					>
						<div class="flex flex-col items-center">
							<span class="text-lg font-bold text-contrast">{{ formatMessage(site.label) }}</span>
							<span class="text-sm font-normal text-secondary">{{ getHostname(site.url) }}</span>
						</div>
					</ButtonLink>
				</div>
			</section>
		</div>

		<section class="vote-section relative mx-auto flex flex-col justify-center">
			<h1 class="subheader">{{ formatMessage(messages.tiersTitle) }}</h1>
			<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				<div
					v-for="tier in tiers"
					:key="tier.id"
					class="flex flex-col gap-6 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
					:class="[`${tier.id}-bg-gradient`, `${tier.id}-border`]"
				>
					<h3 class="m-0 text-center text-2xl font-bold" :class="`${tier.id}-text-color`">
						{{ formatMessage(tier.name) }}
					</h3>
					<div class="text-center">
						<div
							class="bg-clip-text text-4xl font-bold text-transparent"
							:class="`${tier.id}-gradient`"
						>
							{{ tier.percentage }}%
						</div>
						<p class="m-0 text-center text-sm opacity-80" :class="`${tier.id}-text-color`">
							{{ formatMessage(messages.tierChance) }}
						</p>
					</div>
					<div class="flex justify-center">
						<span
							class="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm"
							:class="`${tier.id}-gradient`"
						>
							{{ formatMessage(tier.rarity) }}
						</span>
					</div>
				</div>
			</div>
			<div class="rounded-2xl bg-bg-raised p-6">
				<div class="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
					<div>
						<div class="text-2xl font-bold text-emerald-400">100%</div>
						<div class="text-secondary">{{ formatMessage(messages.statTotalCoverage) }}</div>
					</div>
					<div>
						<div class="text-2xl font-bold" style="color: rgb(96 165 250)">4</div>
						<div class="text-secondary">{{ formatMessage(messages.statRewardTiers) }}</div>
					</div>
					<div>
						<div class="text-2xl font-bold" style="color: rgb(168 85 247)">1%</div>
						<div class="text-secondary">{{ formatMessage(messages.statRarestDrop) }}</div>
					</div>
					<div>
						<div class="text-2xl font-bold" style="color: rgb(255 159 28)">74%</div>
						<div class="text-secondary">{{ formatMessage(messages.statMostCommon) }}</div>
					</div>
				</div>
			</div>
		</section>

		<section class="vote-section relative mx-auto flex flex-col gap-8">
			<h1 class="relative m-0 mt-8 max-w-3xl text-3xl leading-[120%] md:text-7xl">
				{{ formatMessage(messages.tradeInsTitle) }}
			</h1>
			<h2
				class="relative m-0 max-w-2xl text-base font-normal leading-[155%] text-secondary md:text-[18px]"
			>
				{{ formatMessage(messages.tradeInsSubtitle) }}
			</h2>
			<div class="flex flex-col gap-8">
				<div class="relative grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
					<div
						v-for="tradeIn in tradeIns"
						:key="tradeIn.id"
						class="relative flex flex-col gap-4 rounded-2xl bg-bg-raised p-6 text-left md:p-12"
					>
						<div class="flex items-center gap-2">
							<component :is="tradeIn.icon" class="h-6 w-6" aria-hidden="true" />
							<div>
								<h3 class="m-0 text-xl font-bold">{{ formatMessage(tradeIn.title) }}</h3>
								<p class="m-0 text-xs opacity-70">{{ formatMessage(tradeIn.subtitle) }}</p>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<h4 class="m-0 text-sm font-medium opacity-80">
								{{ formatMessage(messages.tradeOptionsLabel) }}
							</h4>
							<div>
								<div
									v-for="option in tradeIn.options"
									:key="option.id"
									class="flex items-start gap-2"
								>
									<div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
									<p class="m-0 text-sm leading-relaxed">
										<IntlFormatted :message-id="option">
											<template #supporter-link="{ children }">
												<NuxtLink to="/store/package/3584585" class="text-link">
													<component :is="() => normalizeChildren(children)" />
												</NuxtLink>
											</template>
										</IntlFormatted>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<p class="m-0 flex justify-center">{{ formatMessage(messages.moreComingSoon) }}</p>
				<div class="rounded-2xl bg-bg-raised p-6">
					<div class="flex flex-col gap-2 text-center">
						<h3 class="m-0 text-lg font-bold">
							{{ formatMessage(messages.howTradeInsWorkTitle) }}
						</h3>
						<p class="m-0 text-sm leading-relaxed">
							{{ formatMessage(messages.howTradeInsWorkDescription) }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<section id="leaderboard" class="vote-section relative mx-auto flex flex-col gap-8">
			<h1 class="relative m-0 mt-8 max-w-3xl text-3xl leading-[120%] md:text-7xl">
				{{ formatMessage(messages.leaderboardTitle) }}
			</h1>
			<h2
				class="relative m-0 max-w-2xl text-base font-normal leading-[155%] text-secondary md:text-[18px]"
			>
				{{ formatMessage(messages.leaderboardSubtitle) }}
			</h2>
			<div class="flex flex-col gap-4">
				<div class="flex w-full gap-3">
					<Input
						v-model="usernameQuery"
						:icon="SearchIcon"
						:placeholder="formatMessage(messages.searchPlaceholder)"
						clearable
						autocomplete="off"
						spellcheck="false"
						wrapper-class="flex-grow"
					/>
					<Combobox
						v-model="sortOrder"
						:options="sortOptions"
						class="!w-auto"
						:aria-label="formatMessage(messages.sortByLabel)"
					>
						<template #selected="{ label }">
							<span class="font-semibold text-primary">{{
								formatMessage(messages.sortByLabel)
							}}</span>
							<span class="font-semibold text-secondary">{{ label }}</span>
						</template>
					</Combobox>
				</div>
				<div class="leaderboard-table rounded-2xl bg-bg-raised p-4">
					<div class="leaderboard-row leaderboard-header">
						<div>{{ formatMessage(messages.columnAvatar) }}</div>
						<div>{{ formatMessage(messages.columnUsername) }}</div>
						<div class="max-md:hidden">{{ formatMessage(messages.columnDaily) }}</div>
						<div class="max-md:hidden">{{ formatMessage(messages.columnWeekly) }}</div>
						<div class="max-md:hidden">{{ formatMessage(messages.columnMonthly) }}</div>
						<div class="max-md:hidden">{{ formatMessage(messages.columnAllTime) }}</div>
						<div class="md:hidden">{{ formatMessage(messages.columnCombined) }}</div>
					</div>
					<div v-for="vote in leaderboard ?? []" :key="vote.uuid" class="leaderboard-row">
						<div>
							<Avatar
								:src="`https://minotar.net/helm/${vote.uuid}`"
								:alt="vote.username"
								aria-hidden="true"
								size="32px"
								no-shadow
							/>
						</div>
						<div>{{ vote.username }}</div>
						<div class="max-md:hidden">{{ vote.daily }}</div>
						<div class="max-md:hidden">{{ vote.weekly }}</div>
						<div class="max-md:hidden">{{ vote.monthly }}</div>
						<div class="max-md:hidden">{{ vote.allTime }}</div>
						<div class="md:hidden">
							{{ vote.daily }} / {{ vote.weekly }} / {{ vote.monthly }} / {{ vote.allTime }}
						</div>
					</div>
				</div>
			</div>
		</section>

		<section
			class="vote-section relative mx-auto !mt-8 mb-16 flex flex-col gap-4 rounded-2xl bg-bg-raised p-6 text-left md:p-12"
		>
			<h1 class="m-0 text-lg font-bold">{{ formatMessage(messages.faqTitle) }}</h1>
			<div class="flex flex-col gap-1">
				<details v-for="faq in faqs" :key="faq.id" class="group">
					<summary class="flex cursor-pointer items-center py-3 font-medium text-contrast">
						<ChevronRightIcon
							class="mr-2 transition-transform duration-200 group-open:rotate-90"
							aria-hidden="true"
						/>
						{{ formatMessage(faq.question) }}
					</summary>
					<p class="m-0 ml-6 leading-[160%]">
						<template v-for="(paragraph, index) in faq.answer" :key="paragraph.id">
							<template v-if="index > 0">
								<br />
								<br />
							</template>
							{{ formatMessage(paragraph) }}
						</template>
					</p>
				</details>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import {
	ChevronRightIcon,
	CrownIcon,
	SearchIcon,
	SparklesIcon,
	SquareCheckIcon,
	StarIcon,
	ZapIcon,
} from '@modrinth/assets'
import {
	Avatar,
	Button,
	ButtonLink,
	Combobox,
	defineMessages,
	Input,
	IntlFormatted,
	normalizeChildren,
	useVIntl,
} from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'
import { refDebounced } from '@vueuse/core'

import type { VoteLeaderboardEntry } from '~/server/routes/api/votes.get'

type SortOrder = 'today' | 'week' | 'month' | 'all'

const { formatMessage } = useVIntl()

const messages = defineMessages({
	seoTitle: {
		id: 'vote.seo.title',
		defaultMessage: 'Vote for Vanilla Tyme SMP',
	},
	seoDescription: {
		id: 'vote.seo.description',
		defaultMessage: 'Support the Vanilla Tyme SMP server by voting and helping us grow!',
	},
	heroTitleLine1: {
		id: 'vote.hero.title-line-1',
		defaultMessage: 'Vote for',
	},
	heroTitleLine2: {
		id: 'vote.hero.title-line-2',
		defaultMessage: 'Vanilla Tyme SMP',
	},
	heroSubtitle: {
		id: 'vote.hero.subtitle',
		defaultMessage: 'Support the server by voting to help us grow and keep the community active!',
	},
	voteButton: {
		id: 'vote.hero.vote-button',
		defaultMessage: 'Vote for the server',
	},
	leaderboardButton: {
		id: 'vote.hero.leaderboard-button',
		defaultMessage: 'View the leaderboard',
	},
	voteLinksTitle: {
		id: 'vote.links.title',
		defaultMessage: 'Vote links',
	},
	siteCurseforge: {
		id: 'vote.links.site.curseforge',
		defaultMessage: 'Curseforge',
	},
	siteMinecraftMultiplayer: {
		id: 'vote.links.site.minecraft-multiplayer',
		defaultMessage: 'Minecraft Multiplayer',
	},
	siteMinecraftServerList: {
		id: 'vote.links.site.minecraft-server-list',
		defaultMessage: 'Minecraft Server List',
	},
	siteMinecraftServers: {
		id: 'vote.links.site.minecraft-servers',
		defaultMessage: 'Minecraft Servers',
	},
	siteMinelist: {
		id: 'vote.links.site.minelist',
		defaultMessage: 'Minelist',
	},
	siteOfficialServerList: {
		id: 'vote.links.site.official-server-list',
		defaultMessage: 'Official Server List',
	},
	sitePlanetMinecraft: {
		id: 'vote.links.site.planet-minecraft',
		defaultMessage: 'Planet Minecraft',
	},
	tiersTitle: {
		id: 'vote.tiers.title',
		defaultMessage: 'Vote reward tiers',
	},
	tierChance: {
		id: 'vote.tiers.chance',
		defaultMessage: 'Chance',
	},
	tierRegular: {
		id: 'vote.tiers.regular',
		defaultMessage: 'Regular',
	},
	tierLucky: {
		id: 'vote.tiers.lucky',
		defaultMessage: 'Lucky',
	},
	tierExtraLucky: {
		id: 'vote.tiers.extra-lucky',
		defaultMessage: 'Extra Lucky',
	},
	tierCollectible: {
		id: 'vote.tiers.collectible',
		defaultMessage: 'Collectible',
	},
	rarityCommon: {
		id: 'vote.tiers.rarity.common',
		defaultMessage: 'common',
	},
	rarityUncommon: {
		id: 'vote.tiers.rarity.uncommon',
		defaultMessage: 'uncommon',
	},
	rarityRare: {
		id: 'vote.tiers.rarity.rare',
		defaultMessage: 'rare',
	},
	rarityLegendary: {
		id: 'vote.tiers.rarity.legendary',
		defaultMessage: 'legendary',
	},
	statTotalCoverage: {
		id: 'vote.tiers.stat.total-coverage',
		defaultMessage: 'Total coverage',
	},
	statRewardTiers: {
		id: 'vote.tiers.stat.reward-tiers',
		defaultMessage: 'Reward Tiers',
	},
	statRarestDrop: {
		id: 'vote.tiers.stat.rarest-drop',
		defaultMessage: 'Rarest Drop',
	},
	statMostCommon: {
		id: 'vote.tiers.stat.most-common',
		defaultMessage: 'Most Common',
	},
	tradeInsTitle: {
		id: 'vote.trade-ins.title',
		defaultMessage: 'Collectible Trade-ins',
	},
	tradeInsSubtitle: {
		id: 'vote.trade-ins.subtitle',
		defaultMessage: 'Trade your unique collectibles for exclusive perks and rewards',
	},
	tradeOptionsLabel: {
		id: 'vote.trade-ins.options-label',
		defaultMessage: 'Available trade options:',
	},
	uniqueCollectibles: {
		id: 'vote.trade-ins.unique-collectibles',
		defaultMessage: 'unique collectibles',
	},
	tradeFiveTitle: {
		id: 'vote.trade-ins.five.title',
		defaultMessage: 'Trade 5 Collectibles',
	},
	tradeFiveSpawnMob: {
		id: 'vote.trade-ins.five.spawn-mob',
		defaultMessage: 'Spawn any mob (except Wither/Dragon) at chosen location',
	},
	tradeFiveTrident: {
		id: 'vote.trade-ins.five.trident',
		defaultMessage: 'Unenchanted Trident',
	},
	tradeFiveNetherRoof: {
		id: 'vote.trade-ins.five.nether-roof',
		defaultMessage: '3x3 Nether roof access',
	},
	tradeTenTitle: {
		id: 'vote.trade-ins.ten.title',
		defaultMessage: 'Trade 10 Collectibles',
	},
	tradeTenMoveSpawner: {
		id: 'vote.trade-ins.ten.move-spawner',
		defaultMessage: 'Move any spawner to your base (same dimension, with permissions)',
	},
	tradeTenSupporter: {
		id: 'vote.trade-ins.ten.supporter',
		defaultMessage: '<supporter-link>Supporter</supporter-link> rank',
	},
	tradeTenConvertSpawner: {
		id: 'vote.trade-ins.ten.convert-spawner',
		defaultMessage: 'Convert Overworld spawner to zombie, skeleton, spider, or cave spider',
	},
	tradeTenAxe: {
		id: 'vote.trade-ins.ten.axe',
		defaultMessage: 'Looting III Netherite axe',
	},
	tradeTwentyFourTitle: {
		id: 'vote.trade-ins.twenty-four.title',
		defaultMessage: 'Trade 24 Collectibles',
	},
	tradeTwentyFourBow: {
		id: 'vote.trade-ins.twenty-four.bow',
		defaultMessage: 'Mending + Infinity Bow',
	},
	tradeTwentyFourArmor: {
		id: 'vote.trade-ins.twenty-four.armor',
		defaultMessage:
			'1.14 God Armor Set: Diamond armor with all Protection types (IV), Thorns III, plus Depth Strider III, Feather Falling IV, Aqua Affinity & Respiration III',
	},
	tradeSetsTitle: {
		id: 'vote.trade-ins.sets.title',
		defaultMessage: 'Trade 3 Sets',
	},
	tradeSetsSubtitle: {
		id: 'vote.trade-ins.sets.subtitle',
		defaultMessage: 'of 24 unique collectibles',
	},
	tradeSetsCustomCollectible: {
		id: 'vote.trade-ins.sets.custom-collectible',
		defaultMessage:
			'Custom personalized collectible item of your choice added to collectible list. Contact staff via Discord ticket to start approval process. Remains in rotation permanently (unless player banned)',
	},
	moreComingSoon: {
		id: 'vote.trade-ins.more-coming-soon',
		defaultMessage: '...and more coming soon™!',
	},
	howTradeInsWorkTitle: {
		id: 'vote.trade-ins.how-it-works.title',
		defaultMessage: 'How Trade-Ins work',
	},
	howTradeInsWorkDescription: {
		id: 'vote.trade-ins.how-it-works.description',
		defaultMessage:
			'Collect unique items through voting, then trade them in for special perks! Once you have the required number of unique collectibles, you can exchange them for any of the available options in that tier. Choose wisely - traded collectibles are consumed in the process.',
	},
	leaderboardTitle: {
		id: 'vote.leaderboard.title',
		defaultMessage: 'Voting Leaderboard',
	},
	leaderboardSubtitle: {
		id: 'vote.leaderboard.subtitle',
		defaultMessage: 'Just a little friendly competition!',
	},
	searchPlaceholder: {
		id: 'vote.leaderboard.search-placeholder',
		defaultMessage: 'Search usernames...',
	},
	sortByLabel: {
		id: 'vote.leaderboard.sort-by',
		defaultMessage: 'Sort by:',
	},
	sortToday: {
		id: 'vote.leaderboard.sort.today',
		defaultMessage: 'Today',
	},
	sortWeek: {
		id: 'vote.leaderboard.sort.week',
		defaultMessage: 'This week',
	},
	sortMonth: {
		id: 'vote.leaderboard.sort.month',
		defaultMessage: 'This month',
	},
	sortAll: {
		id: 'vote.leaderboard.sort.all',
		defaultMessage: 'All time',
	},
	columnAvatar: {
		id: 'vote.leaderboard.column.avatar',
		defaultMessage: 'Avatar',
	},
	columnUsername: {
		id: 'vote.leaderboard.column.username',
		defaultMessage: 'Username',
	},
	columnDaily: {
		id: 'vote.leaderboard.column.daily',
		defaultMessage: 'Daily',
	},
	columnWeekly: {
		id: 'vote.leaderboard.column.weekly',
		defaultMessage: 'Weekly',
	},
	columnMonthly: {
		id: 'vote.leaderboard.column.monthly',
		defaultMessage: 'Monthly',
	},
	columnAllTime: {
		id: 'vote.leaderboard.column.all-time',
		defaultMessage: 'All Time',
	},
	columnCombined: {
		id: 'vote.leaderboard.column.combined',
		defaultMessage: 'D / W / M / All',
	},
	faqTitle: {
		id: 'vote.faq.title',
		defaultMessage: 'Frequently Asked Questions',
	},
	faqCollectiblesQuestion: {
		id: 'vote.faq.collectibles.question',
		defaultMessage: 'What are collectibles?',
	},
	faqCollectiblesAnswer1: {
		id: 'vote.faq.collectibles.answer-1',
		defaultMessage:
			'Collectibles are special items that you can obtain from voting and turn in to get various perks. Some collectibles have special desirable characteristics that cannot be obtained in vanilla Minecraft while others are just for show. All Collectibles can be identified by the “Collectible” text in the lore of the item. Collectibles are commonly traded, bought, and sold between players.',
	},
	faqCollectiblesAnswer2: {
		id: 'vote.faq.collectibles.answer-2',
		defaultMessage:
			'All staff have a collectible named for them. Players have the ability to get a collectible named for them by winning early map competitions or by turning in sets of collectibles.',
	},
	faqTrophiesQuestion: {
		id: 'vote.faq.trophies.question',
		defaultMessage: 'What are trophies?',
	},
	faqTrophiesAnswer1: {
		id: 'vote.faq.trophies.answer-1',
		defaultMessage:
			'Trophies are special items awarded to players. Trophies can commonly be obtained as milestone voting swords (every 50 votes), holiday gifts, event gifts, competition prizes, weekly competition prizes, mini-game winner prizes and more.',
	},
	faqTrophiesAnswer2: {
		id: 'vote.faq.trophies.answer-2',
		defaultMessage:
			'All Trophies can be identified by the “Trophy” text in the lore of the item. Like collectibles, trophies are commonly traded, bought, and sold between players in game.',
	},
	faqTrophiesAnswer3: {
		id: 'vote.faq.trophies.answer-3',
		defaultMessage:
			'5 Trophies can be traded in for one Collectible. Contact a staff member in game or through discord support when you are ready to trade the trophies in. You will be given a Collectible Scoop.',
	},
})

useSeoMeta({
	title: () => formatMessage(messages.seoTitle),
	description: () => formatMessage(messages.seoDescription),
	ogTitle: () => formatMessage(messages.seoTitle),
	ogDescription: () => formatMessage(messages.seoDescription),
})

const voteSites = [
	{
		id: 'curseforge',
		label: messages.siteCurseforge,
		url: 'https://www.curseforge.com/servers/server/vanilla-tyme/vote',
	},
	{
		id: 'minecraft-multiplayer',
		label: messages.siteMinecraftMultiplayer,
		url: 'https://minecraft-mp.com/server/201773/vote/',
	},
	{
		id: 'minecraft-server-list',
		label: messages.siteMinecraftServerList,
		url: 'https://minecraft-server-list.com/server/396381/vote/',
	},
	{
		id: 'minecraft-servers',
		label: messages.siteMinecraftServers,
		url: 'https://minecraftservers.org/vote/433422',
	},
	{
		id: 'minelist',
		label: messages.siteMinelist,
		url: 'https://minelist.net/vote/2329',
	},
	{
		id: 'official-server-list',
		label: messages.siteOfficialServerList,
		url: 'https://findmcserver.com/server/dRjaj6rGmO',
	},
	{
		id: 'planet-minecraft',
		label: messages.sitePlanetMinecraft,
		url: 'https://www.planetminecraft.com/server/vanillatyme/vote/',
	},
]

const tiers = [
	{
		id: 'regular',
		name: messages.tierRegular,
		percentage: 74,
		rarity: messages.rarityCommon,
	},
	{
		id: 'lucky',
		name: messages.tierLucky,
		percentage: 20,
		rarity: messages.rarityUncommon,
	},
	{
		id: 'extra-lucky',
		name: messages.tierExtraLucky,
		percentage: 5,
		rarity: messages.rarityRare,
	},
	{
		id: 'collectible',
		name: messages.tierCollectible,
		percentage: 1,
		rarity: messages.rarityLegendary,
	},
]

const tradeIns = [
	{
		id: 'five',
		icon: StarIcon,
		title: messages.tradeFiveTitle,
		subtitle: messages.uniqueCollectibles,
		options: [messages.tradeFiveSpawnMob, messages.tradeFiveTrident, messages.tradeFiveNetherRoof],
	},
	{
		id: 'ten',
		icon: ZapIcon,
		title: messages.tradeTenTitle,
		subtitle: messages.uniqueCollectibles,
		options: [
			messages.tradeTenMoveSpawner,
			messages.tradeTenSupporter,
			messages.tradeTenConvertSpawner,
			messages.tradeTenAxe,
		],
	},
	{
		id: 'twenty-four',
		icon: CrownIcon,
		title: messages.tradeTwentyFourTitle,
		subtitle: messages.uniqueCollectibles,
		options: [messages.tradeTwentyFourBow, messages.tradeTwentyFourArmor],
	},
	{
		id: 'sets',
		icon: SparklesIcon,
		title: messages.tradeSetsTitle,
		subtitle: messages.tradeSetsSubtitle,
		options: [messages.tradeSetsCustomCollectible],
	},
]

const faqs = [
	{
		id: 'collectibles',
		question: messages.faqCollectiblesQuestion,
		answer: [messages.faqCollectiblesAnswer1, messages.faqCollectiblesAnswer2],
	},
	{
		id: 'trophies',
		question: messages.faqTrophiesQuestion,
		answer: [messages.faqTrophiesAnswer1, messages.faqTrophiesAnswer2, messages.faqTrophiesAnswer3],
	},
]

const sortOptions = computed<{ value: SortOrder; label: string }[]>(() => [
	{ value: 'today', label: formatMessage(messages.sortToday) },
	{ value: 'week', label: formatMessage(messages.sortWeek) },
	{ value: 'month', label: formatMessage(messages.sortMonth) },
	{ value: 'all', label: formatMessage(messages.sortAll) },
])

const usernameQuery = ref('')
const debouncedUsernameQuery = refDebounced(usernameQuery, 300)
const sortOrder = ref<SortOrder>('all')

const { data: leaderboard, suspense } = useQuery({
	queryKey: computed(() => ['vote-leaderboard', sortOrder.value, debouncedUsernameQuery.value]),
	queryFn: () =>
		$fetch<VoteLeaderboardEntry[]>('/api/votes', {
			query: {
				order: sortOrder.value,
				username: debouncedUsernameQuery.value.trim() || undefined,
				limit: 10,
			},
		}),
})

onServerPrefetch(() => suspense())

const voteSiteSection = ref<HTMLElement | null>(null)

function scrollToVoteSites() {
	voteSiteSection.value?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToLeaderboard() {
	document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })
}

function getHostname(url: string): string {
	try {
		return new URL(url).hostname.replace('www.', '')
	} catch {
		return url
	}
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
	margin: 2rem 0;
}

.subheader {
	font-size: 3.5rem;
	font-weight: 600;
	line-height: 100%;
	margin: 0 auto;
	padding: 0 4rem 4rem;
	text-align: center;
}

.vote-section {
	max-width: min(100%, 1096px);
	width: min(100%, 1096px);
}

.leaderboard-row {
	display: grid;
	grid-template-columns: min-content minmax(min-content, 2fr) repeat(4, minmax(min-content, 1fr));
	align-items: center;
	gap: 1rem;
	padding: 0.5rem 0.75rem;

	@media (max-width: 767.98px) {
		grid-template-columns: min-content minmax(min-content, 2fr) minmax(min-content, 1fr);
	}

	&:nth-child(odd):not(.leaderboard-header) {
		background-color: var(--surface-1-5, transparent);
	}
}

.leaderboard-header {
	font-weight: 700;
	color: var(--color-contrast);
}

.regular-gradient {
	background-image: linear-gradient(to right, #9ca3af, #4b5563);
}
.regular-bg-gradient {
	background-image: linear-gradient(to right, #f9fafb, #f3f4f6);
}
.regular-text-color {
	color: #374151;
}
.regular-border {
	border: 1px solid #d1d5db;
}

.lucky-gradient {
	background-image: linear-gradient(to right, #4ade80, #16a34a);
}
.lucky-bg-gradient {
	background-image: linear-gradient(to right, #f0fdf4, #dcfce7);
}
.lucky-text-color {
	color: #15803d;
}
.lucky-border {
	border: 1px solid #86efac;
}

.extra-lucky-gradient {
	background-image: linear-gradient(to right, #60a5fa, #2563eb);
}
.extra-lucky-bg-gradient {
	background-image: linear-gradient(to right, #eff6ff, #dbeafe);
}
.extra-lucky-text-color {
	color: #1d4ed8;
}
.extra-lucky-border {
	border: 1px solid #93c5fd;
}

.collectible-gradient {
	background-image: linear-gradient(to right, #a78bfa, #ec4899, #f97316);
}
.collectible-bg-gradient {
	background-image: linear-gradient(to right, #faf5ff, #fce7f3);
}
.collectible-text-color {
	color: #6b21a8;
}
.collectible-border {
	border: 1px solid #c4b5fd;
}
</style>
