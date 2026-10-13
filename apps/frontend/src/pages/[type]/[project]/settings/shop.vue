<template>
	<div>
		<ConfirmLeaveModal ref="confirmLeaveModal" />
		<section class="universal-card">
			<div class="flex flex-col gap-6">
				<div class="text-2xl font-semibold text-contrast">
					{{ formatMessage(messages.heading) }}
				</div>

				<div class="max-w-[600px]">
					<label for="shop-type" class="w-fit">
						<span class="label__title">{{ formatMessage(messages.typeLabel) }}</span>
					</label>
					<Chips
						id="shop-type"
						v-model="stall"
						:items="[false, true]"
						:format-label="(x) => formatMessage(x ? messages.typeStall : messages.typeShop)"
						:capitalize="false"
						:disabled="!hasPermission"
					/>
				</div>

				<div v-if="stall" class="max-w-[600px]">
					<label for="stall-color" class="w-fit">
						<span class="label__title">{{ formatMessage(messages.stallColorLabel) }}</span>
					</label>
					<Combobox
						id="stall-color"
						v-model="stallColor"
						:options="stallColorOptions"
						:placeholder="formatMessage(messages.stallColorPlaceholder)"
						:disabled="!hasPermission"
						show-icon-in-selected
					/>
				</div>

				<div class="max-w-[600px]">
					<label for="shop-x" class="w-fit">
						<span class="label__title">{{ formatMessage(messages.coordinatesLabel) }}</span>
					</label>
					<div class="flex gap-2">
						<Input
							id="shop-x"
							v-model="x"
							type="number"
							:step="1"
							:min="-30000000"
							:max="30000000"
							placeholder="X"
							:disabled="!hasPermission"
							wrapper-class="flex-1"
							autocomplete="off"
						/>
						<Input
							id="shop-z"
							v-model="z"
							type="number"
							:step="1"
							:min="-30000000"
							:max="30000000"
							placeholder="Z"
							:disabled="!hasPermission"
							wrapper-class="flex-1"
							autocomplete="off"
						/>
					</div>
					<span class="mt-2 block text-secondary">
						{{ formatMessage(messages.coordinatesDescription) }}
					</span>
					<span v-if="!coordinatesValid" class="mt-2 block text-red">
						{{ formatMessage(messages.coordinatesInvalid) }}
					</span>
				</div>
			</div>
		</section>

		<UnsavedChangesPopup
			:original="original"
			:modified="modified"
			:saving="saving"
			:can-save="coordinatesValid"
			@reset="resetChanges"
			@save="handleSave"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import {
	Chips,
	Combobox,
	ConfirmLeaveModal,
	defineMessages,
	injectProjectPageContext,
	Input,
	stallColorMessages,
	UnsavedChangesPopup,
	usePageLeaveSafety,
	useVIntl,
	WOOL_COLORS,
} from '@modrinth/ui'
import { isAdmin } from '@modrinth/utils'
import { h, markRaw } from 'vue'

const { formatMessage } = useVIntl()
const { projectV3, currentMember, patchProjectV3 } = injectProjectPageContext()

const messages = defineMessages({
	title: { id: 'project.settings.shop.title', defaultMessage: 'Shop' },
	heading: { id: 'project.settings.shop.heading', defaultMessage: 'Shop details' },
	typeLabel: { id: 'project.settings.shop.type-label', defaultMessage: 'Type' },
	typeShop: { id: 'project.settings.shop.type-shop', defaultMessage: 'Shop' },
	typeStall: { id: 'project.settings.shop.type-stall', defaultMessage: 'Stall' },
	stallColorLabel: { id: 'project.settings.shop.stall-color-label', defaultMessage: 'Stall color' },
	stallColorPlaceholder: {
		id: 'project.settings.shop.stall-color-placeholder',
		defaultMessage: 'Select a color',
	},
	coordinatesLabel: {
		id: 'project.settings.shop.coordinates-label',
		defaultMessage: 'Coordinates',
	},
	coordinatesDescription: {
		id: 'project.settings.shop.coordinates-description',
		defaultMessage: 'Where your shop is in the world. Leave both empty if it has no location yet.',
	},
	coordinatesInvalid: {
		id: 'project.settings.shop.coordinates-invalid',
		defaultMessage: 'Enter both X and Z as whole numbers, or leave both empty.',
	},
})

useProjectSettingsHeadTitle(messages.title)

function woolIcon(color: Labrinth.Projects.v3.StallColor, size = 24) {
	return markRaw(() =>
		h('img', {
			src: `/items/${color}_wool.png`,
		alt: `${formatMessage(stallColorMessages[color])} wool`,
			class: 'object-contain',
			style: { width: `${size}px`, height: `${size}px` },
		}),
	)
}

const stallColorOptions = (Object.keys(WOOL_COLORS) as Labrinth.Projects.v3.StallColor[]).map(
	(color) => ({
		value: color,
		label: formatMessage(stallColorMessages[color]),
		icon: woolIcon(color),
	}),
)

const stall = ref(false)
const stallColor = ref<Labrinth.Projects.v3.StallColor | null>(null)
const x = ref<number | undefined>()
const z = ref<number | undefined>()
const saving = ref(false)

function resetChanges() {
	const shop = projectV3.value?.shop
	stall.value = shop?.stall ?? false
	stallColor.value = shop?.stall_color ?? null
	x.value = shop?.coordinates?.x
	z.value = shop?.coordinates?.z
}
resetChanges()

const isAdminUser = computed(() => isAdmin(currentMember.value?.user))
const hasPermission = computed(() => {
	const EDIT_DETAILS = 1 << 2
	return (
		isAdminUser.value || ((currentMember.value?.permissions ?? 0) & EDIT_DETAILS) === EDIT_DETAILS
	)
})

const coordinatesValid = computed(() => {
	const bothEmpty = x.value === undefined && z.value === undefined
	const bothWhole = Number.isInteger(x.value) && Number.isInteger(z.value)
	return bothEmpty || bothWhole
})

const original = computed(() => ({
	stall: projectV3.value?.shop?.stall ?? false,
	stallColor: projectV3.value?.shop?.stall_color ?? null,
	x: projectV3.value?.shop?.coordinates?.x,
	z: projectV3.value?.shop?.coordinates?.z,
}))

const modified = computed(() => ({
	stall: stall.value,
	stallColor: stallColor.value,
	x: x.value,
	z: z.value,
}))

const hasChanges = computed(() =>
	(Object.keys(original.value) as (keyof typeof original.value)[]).some(
		(key) => original.value[key] !== modified.value[key],
	),
)

const { confirmLeaveModal } = usePageLeaveSafety(hasChanges)

async function handleSave() {
	if (saving.value || !coordinatesValid.value) return
	saving.value = true
	try {
		await patchProjectV3(
			{
				shop: {
					stall: stall.value,
					stall_color: stall.value ? stallColor.value : null,
					coordinates:
						x.value !== undefined && z.value !== undefined ? { x: x.value, z: z.value } : null,
				},
			},
			false,
			true,
		)
	} catch {
		// patchProjectV3 already shows an error notification
	} finally {
		saving.value = false
	}
}
</script>
