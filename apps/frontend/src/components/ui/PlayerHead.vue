<template>
	<span
		class="player-head"
		:class="{ 'player-head--missing': failed }"
		:style="{ '--_size': `${size}px`, '--_skin': failed ? 'none' : `url(${src})` }"
		role="img"
		:aria-label="alt"
	>
		<template v-if="!failed">
			<span class="player-head__face" />
			<span class="player-head__hat" />
			<img :src="src" alt="" class="hidden" @error="failed = true" />
		</template>
	</span>
</template>

<script setup lang="ts">
/**
 * A flat Minecraft head drawn from the player's skin texture (face plus hat layer), served by
 * `/api/head`. Shows a plain placeholder when the player has no custom skin or can't be found.
 */
const props = withDefaults(
	defineProps<{
		/** UUID (preferred, survives renames) or username. */
		player: string
		size?: number
		alt?: string
	}>(),
	{
		size: 32,
		alt: '',
	},
)

const src = computed(() => `/api/head/${encodeURIComponent(props.player)}`)
const failed = ref(false)

watch(src, () => (failed.value = false))
</script>

<style scoped lang="scss">
.player-head {
	position: relative;
	display: inline-block;
	flex-shrink: 0;
	width: var(--_size);
	height: var(--_size);
	border-radius: calc(var(--_size) / 8);
	overflow: hidden;
}

.player-head--missing {
	background: var(--surface-4, var(--color-button-bg));
}

.player-head__face,
.player-head__hat {
	position: absolute;
	inset: 0;
	background-image: var(--_skin);
	background-repeat: no-repeat;
	background-size: calc(var(--_size) * 8) auto;
	image-rendering: pixelated;
}

.player-head__face {
	background-position: calc(var(--_size) * -1) calc(var(--_size) * -1);
}

.player-head__hat {
	background-position: calc(var(--_size) * -5) calc(var(--_size) * -1);
}
</style>
