<template>
	<div>
		<div class="landing-hero">
			<h1 class="main-header">
				{{ formatMessage(messages.heroPre) }}
				<span class="main-header-strong">{{ formatMessage(messages.heroAccent) }}</span>
			</h1>
			<h2 class="main-subheader">{{ formatMessage(messages.heroSubtitle) }}</h2>
			<ButtonLink type="outlined" size="lg" to="/rules/competitions">
				<BookOpenIcon aria-hidden="true" />
				{{ formatMessage(messages.rulesButton) }}
			</ButtonLink>
		</div>

		<section class="competitions-section mx-auto mb-16 flex flex-col gap-6">
			<div
				v-if="live"
				class="live-card flex flex-col gap-5 rounded-3xl bg-bg-raised p-6 md:p-8"
				aria-live="polite"
			>
				<div class="flex flex-wrap items-center justify-between gap-3">
					<div class="flex min-w-0 flex-col gap-1">
						<span class="eyebrow flex items-center gap-2">
							<span class="live-dot" aria-hidden="true" />
							{{ formatMessage(messages.liveEyebrow) }}
						</span>
						<h2 class="m-0 text-2xl font-bold text-contrast md:text-3xl">{{ live.title }}</h2>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<span v-if="live.endedAt > 0" class="tag">
							{{ formatMessage(messages.endsIn, { time: relativeTime(new Date(live.endedAt)) }) }}
						</span>
						<span class="tag">
							{{ formatMessage(messages.playersCount, { count: live.results.length }) }}
						</span>
					</div>
				</div>
				<CompetitionResults :competition="live" large />
				<span class="text-center text-sm text-secondary">
					{{ formatMessage(messages.liveNote, { time: relativeTime(new Date(live.updatedAt)) }) }}
				</span>
			</div>

			<Chips
				v-if="(data?.seasons.length ?? 0) > 1"
				v-model="season"
				:items="data?.seasons ?? []"
				:format-label="seasonLabel"
				:capitalize="false"
			/>

			<div
				v-if="featured"
				class="flex flex-col gap-6 transition-opacity duration-200"
				:class="{ 'opacity-50': isPlaceholderData }"
				:aria-busy="isPlaceholderData"
			>
				<div :key="featured.id" class="flex flex-col gap-5 rounded-3xl bg-bg-raised p-6 md:p-8">
					<div class="flex flex-wrap items-center justify-between gap-3">
						<div class="flex min-w-0 flex-col gap-1">
							<span class="eyebrow">{{ formatMessage(messages.latest) }}</span>
							<h2 class="m-0 text-2xl font-bold text-contrast md:text-3xl">
								{{ featured.title }}
							</h2>
						</div>
						<div class="flex flex-wrap items-center gap-2">
							<span v-if="featured.mystery" class="tag">
								{{ formatMessage(messages.mystery) }}
							</span>
							<span class="tag">{{ endedOn(featured) }}</span>
						</div>
					</div>
					<CompetitionResults :competition="featured" large />
				</div>

				<div v-if="earlier.length" class="flex flex-col gap-3">
					<h2 class="m-0 text-xl font-bold text-contrast">
						{{ formatMessage(messages.earlierWeeks) }}
					</h2>
					<Accordion
						v-for="competition in earlier"
						:key="competition.id"
						button-class="button-animation flex flex-col gap-1 px-6 py-4 w-full bg-transparent cursor-pointer border-none"
						title-wrapper-class="flex flex-col gap-2 justify-start items-start"
						content-class="mx-6 mb-6"
						class="rounded-2xl bg-bg-raised"
						@on-open="opened.add(competition.id)"
					>
						<template #title>
							<div class="flex w-full min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-left">
								<span class="min-w-0 flex-1 truncate text-lg font-bold text-contrast">
									{{ competition.title }}
								</span>
								<span v-if="winner(competition)" class="flex items-center gap-2">
									<CrownIcon class="size-4 text-[#f2c14e]" aria-hidden="true" />
									<PlayerHead
										:player="winner(competition)!.uuid ?? winner(competition)!.username"
										:size="20"
										aria-hidden="true"
									/>
									<span class="font-semibold">{{ winner(competition)!.username }}</span>
								</span>
								<span class="text-sm text-secondary">{{ endedOn(competition) }}</span>
							</div>
						</template>
						<CompetitionResults v-if="opened.has(competition.id)" :competition="competition" />
					</Accordion>
				</div>
			</div>

			<div
				v-else-if="!live"
				class="flex flex-col items-center gap-2 rounded-3xl bg-bg-raised p-10 text-center"
			>
				<CrownIcon class="size-8 text-brand" aria-hidden="true" />
				<span class="text-lg font-bold text-contrast">{{
					formatMessage(messages.emptyTitle)
				}}</span>
				<span>{{ formatMessage(messages.emptyDescription) }}</span>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { BookOpenIcon, CrownIcon } from '@modrinth/assets'
import {
	Accordion,
	ButtonLink,
	Chips,
	defineMessages,
	useFormatDateTime,
	useRelativeTime,
	useVIntl,
} from '@modrinth/ui'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

import CompetitionResults from '~/components/ui/competitions/CompetitionResults.vue'
import PlayerHead from '~/components/ui/PlayerHead.vue'
import type { CompetitionSeason } from '~/server/routes/api/competitions/index.get'
import type { Competition, LiveCompetition } from '~/server/utils/competitions'

const { formatMessage } = useVIntl()
const formatDate = useFormatDateTime({ dateStyle: 'long' })

const messages = defineMessages({
	heroPre: {
		id: 'competitions.hero.pre',
		defaultMessage: 'Weekly',
	},
	heroAccent: {
		id: 'competitions.hero.accent',
		defaultMessage: 'Competitions',
	},
	heroSubtitle: {
		id: 'competitions.hero.subtitle',
		defaultMessage: 'Every week, every winner. See how everyone placed, season by season.',
	},
	rulesButton: {
		id: 'competitions.hero.rules-button',
		defaultMessage: 'Competition rules',
	},
	liveEyebrow: {
		id: 'competitions.live.eyebrow',
		defaultMessage: 'Live this week',
	},
	endsIn: {
		id: 'competitions.live.ends-in',
		defaultMessage: 'Ends {time}',
	},
	playersCount: {
		id: 'competitions.live.players',
		defaultMessage: '{count, plural, one {# player} other {# players}}',
	},
	liveNote: {
		id: 'competitions.live.note',
		defaultMessage: 'Standings update every minute. Last updated {time}.',
	},
	seasonLabel: {
		id: 'competitions.season-label',
		defaultMessage: 'Season {number}',
	},
	latest: {
		id: 'competitions.latest',
		defaultMessage: 'Latest results',
	},
	earlierWeeks: {
		id: 'competitions.earlier-weeks',
		defaultMessage: 'Earlier weeks',
	},
	mystery: {
		id: 'competitions.mystery',
		defaultMessage: 'Mystery',
	},
	endedOn: {
		id: 'competitions.ended-on',
		defaultMessage: 'Ended {date}',
	},
	emptyTitle: {
		id: 'competitions.empty.title',
		defaultMessage: 'No results yet',
	},
	emptyDescription: {
		id: 'competitions.empty.description',
		defaultMessage: "Results show up here as soon as a week's competition ends.",
	},
	seoTitle: {
		id: 'competitions.seo.title',
		defaultMessage: 'Weekly Competitions',
	},
	seoDescription: {
		id: 'competitions.seo.description',
		defaultMessage:
			'Results from every Vanilla Tyme weekly competition: the podium and how every player placed.',
	},
})

useSeoMeta({
	title: () => formatMessage(messages.seoTitle),
	description: () => formatMessage(messages.seoDescription),
	ogTitle: () => formatMessage(messages.seoTitle),
	ogDescription: () => formatMessage(messages.seoDescription),
})

const season = ref<number | null>(null)

const { data, suspense, isPlaceholderData } = useQuery({
	queryKey: computed(() => ['competitions', season.value]),
	queryFn: () =>
		$fetch<CompetitionSeason>('/api/competitions', {
			query: { season: season.value ?? undefined },
		}),
	placeholderData: keepPreviousData,
	retry: false,
})

const { data: liveData, suspense: liveSuspense } = useQuery({
	queryKey: ['competitions-live'],
	queryFn: () => $fetch<LiveCompetition | null>('/api/competitions/live'),
	refetchInterval: 60_000,
	retry: false,
})

onServerPrefetch(() => Promise.all([suspense(), liveSuspense()]))

const live = computed(() => liveData.value ?? null)
const relativeTime = useRelativeTime()

watch(
	() => data.value?.season,
	(loaded) => {
		if (season.value === null && loaded != null) season.value = loaded
	},
	{ immediate: true },
)

/** Earlier weeks only load their skins and heads once opened, since closed accordions still render. */
const opened = reactive(new Set<number>())

const featured = computed(() => data.value?.competitions[0] ?? null)
const earlier = computed(() => data.value?.competitions.slice(1) ?? [])

function seasonLabel(number: number) {
	return formatMessage(messages.seasonLabel, { number })
}

function endedOn(competition: Competition) {
	return formatMessage(messages.endedOn, { date: formatDate(new Date(competition.endedAt)) })
}

function winner(competition: Competition) {
	return competition.results.find((result) => result.place === 1) ?? null
}
</script>

<style scoped lang="scss">
.landing-hero {
	position: relative;
	padding: 6rem 1rem 4rem;
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
	margin: 1rem 0 2rem;
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

@media screen and (max-width: 1024px) {
	.main-header {
		font-size: 4rem;
	}

	.landing-hero .main-subheader {
		font-size: 1.25rem;
	}
}

@media screen and (max-width: 746px) {
	.main-header {
		font-size: 3rem;
	}

	.landing-hero .main-subheader {
		font-size: 1.1rem;
	}
}

.competitions-section {
	width: min(calc(100% - 2rem), 1096px);
}

.eyebrow {
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--color-brand);
}

.live-card {
	border: 1px solid color-mix(in oklch, var(--color-brand) 30%, transparent);
}

.live-dot {
	width: 0.55rem;
	height: 0.55rem;
	border-radius: 999px;
	background: var(--color-red, #ef4444);
	animation: live-pulse 1.6s ease-in-out infinite;
}

@keyframes live-pulse {
	50% {
		opacity: 0.35;
	}
}

@media (prefers-reduced-motion: reduce) {
	.live-dot {
		animation: none;
	}
}

.tag {
	padding: 0.3rem 0.75rem;
	border-radius: 999px;
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--landing-color-heading);
	background: color-mix(in oklch, var(--landing-color-subheading) 8%, transparent);
	border: 1px solid color-mix(in oklch, var(--landing-color-subheading) 15%, transparent);
}
</style>
