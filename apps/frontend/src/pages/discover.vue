<script setup lang="ts">
import { getMarginTarget } from '@modrinth/moderation'

const modSettings = useModerationSettings()

const marginTarget = computed(() => getMarginTarget(modSettings.value))
</script>
<template>
	<div
		class="box-border flex w-full max-w-[1280px] flex-col gap-4 px-6 pb-6"
		:class="`m${marginTarget}-auto`"
	>
		<NuxtPage />
	</div>
</template>
