<template>
	<div class="competition-results">
		<div class="podium" :class="{ 'podium--large': large }">
			<div v-for="step in podium" :key="step.place" class="podium-step">
				<CrownIcon v-if="step.place === 1" class="podium-crown" aria-hidden="true" />
				<span class="podium-name">{{ step.result?.username ?? '—' }}</span>
				<img
					v-if="step.result && !failedSkins.has(step.result.username)"
					:key="step.result.username"
					:src="`/api/skin/${step.result.username}`"
					:alt="formatMessage(messages.skinAlt, { player: step.result.username })"
					class="podium-skin"
					:style="{ height: step.height }"
					loading="lazy"
					@error="failedSkins.add(step.result.username)"
				/>
				<div class="podium-block" :class="`podium-block--${step.place}`">
					{{ step.place }}
				</div>
			</div>
		</div>
		<ol class="results-list">
			<li
				v-for="result in competition.results"
				:key="result.place"
				class="results-row"
				:class="{ 'results-row--podium': result.place <= 3 }"
			>
				<span class="results-place" :class="`results-place--${result.place}`">
					{{ result.place }}
				</span>
				<PlayerHead :player="result.uuid ?? result.username" :size="28" aria-hidden="true" />
				<span class="results-name">{{ result.username }}</span>
				<span class="results-score">{{ scoreFormat.format(result.score) }}</span>
			</li>
		</ol>
		<p v-if="competition.onlyPodium" class="results-note">
			{{ formatMessage(messages.onlyPodium) }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { CrownIcon } from '@modrinth/assets'
import { defineMessages, useVIntl } from '@modrinth/ui'

import PlayerHead from '~/components/ui/PlayerHead.vue'
import type { Competition } from '~/server/utils/competitions'

const props = defineProps<{
	competition: Competition
	/** Bigger skins, for the featured week at the top of the page. */
	large?: boolean
}>()

const { formatMessage } = useVIntl()
const scoreFormat = new Intl.NumberFormat('en-US')

/** Names whose skin render failed (e.g. a typo in the old spreadsheet), so the podium shows just the name. */
const failedSkins = reactive(new Set<string>())

const podium = computed(() => {
	const heights = props.large ? ['200px', '170px', '150px'] : ['150px', '128px', '112px']
	return [2, 1, 3].map((place) => ({
		place,
		result: props.competition.results.find((result) => result.place === place) ?? null,
		height: heights[place - 1],
	}))
})

const messages = defineMessages({
	skinAlt: {
		id: 'competitions.results.skin-alt',
		defaultMessage: "{player}'s skin",
	},
	onlyPodium: {
		id: 'competitions.results.only-podium',
		defaultMessage: 'Only the top 3 were recorded for this week.',
	},
})
</script>

<style lang="scss" scoped>
.competition-results {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	gap: 1.5rem;
	align-items: end;

	@media (max-width: 767.98px) {
		grid-template-columns: minmax(0, 1fr);
	}
}

.podium {
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 0.75rem;
	width: 100%;
	max-width: 26rem;
	margin: 0 auto;
}

.podium-step {
	display: flex;
	flex: 1;
	min-width: 0;
	flex-direction: column;
	align-items: center;
}

.podium-crown {
	width: 22px;
	height: 22px;
	margin-bottom: 0.25rem;
	color: #f2c14e;
}

.podium-name {
	max-width: 100%;
	margin-bottom: 0.5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-weight: 700;
	color: var(--color-contrast);
}

.podium-skin {
	display: block;
	width: auto;
	margin-bottom: -0.25rem;
}

.podium-block {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 0.75rem 0.75rem 0 0;
	font-size: 1.5rem;
	font-weight: 800;
	color: #1a1a1a;
}

.podium-block--1 {
	height: 4.5rem;
	background: #f2c14e;
}

.podium-block--2 {
	height: 3.25rem;
	background: #c9ced6;
}

.podium-block--3 {
	height: 2.5rem;
	background: #d08b5b;
}

.podium--large .podium-block--1 {
	height: 5.5rem;
}

.results-list {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	margin: 0;
	padding: 0;
	list-style: none;
	align-self: start;
}

.results-row {
	display: grid;
	grid-template-columns: 2rem 28px minmax(0, 1fr) auto;
	align-items: center;
	gap: 0.75rem;
	padding: 0.4rem 0.75rem;
	border-radius: 0.75rem;

	&:nth-child(odd) {
		background: var(--surface-1-5, transparent);
	}
}

.results-row--podium .results-name {
	font-weight: 700;
	color: var(--color-contrast);
}

.results-place {
	font-weight: 800;
	text-align: center;
	color: var(--color-secondary);
}

.results-place--1 {
	color: #f2c14e;
}

.results-place--2 {
	color: #c9ced6;
}

.results-place--3 {
	color: #d08b5b;
}

.results-name {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.results-score {
	font-variant-numeric: tabular-nums;
	font-weight: 600;
	color: var(--color-contrast);
}

.results-note {
	grid-column: 1 / -1;
	margin: 0;
	font-size: 0.875rem;
	text-align: center;
	color: var(--color-secondary);
}
</style>
