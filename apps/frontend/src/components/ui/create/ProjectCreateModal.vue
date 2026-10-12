<template>
	<NewModal ref="modal" :header="formatMessage(messages.title)" :max-width="'550px'">
		<div class="flex w-full flex-col gap-6">
			<CreateLimitAlert v-model="hasHitLimit" type="project" />
			<div class="flex flex-col gap-2.5">
				<label for="shop-type">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.typeLabel) }}
					</span>
				</label>
				<Chips
					id="shop-type"
					v-model="shopType"
					:items="shopTypes"
					:format-label="(x) => x.display"
					:capitalize="false"
					:disabled="hasHitLimit"
				/>
			</div>

			<div class="flex flex-col gap-2.5">
				<label for="name">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.nameLabel) }}
					</span>
				</label>
				<Input
					id="name"
					v-model="name"
					:maxlength="64"
					:placeholder="formatMessage(messages.namePlaceholder)"
					autocomplete="off"
					:disabled="hasHitLimit"
					@update:model-value="updatedName()"
				/>
			</div>
			<div
				class="flex flex-col gap-2.5"
				@focusin="onSlugSuggestionFocusIn"
				@focusout="onSlugSuggestionFocusOut"
			>
				<label for="slug" class="text-md font-semibold text-contrast">
					{{ formatMessage(messages.urlLabel) }}
				</label>
				<Input
					id="slug"
					v-model="slug"
					:maxlength="64"
					class="w-full"
					type="text"
					autocomplete="off"
					:disabled="hasHitLimit"
					@update:model-value="manualSlug = true"
				>
					<template #prefix>https://vanillatyme.com/shop/</template>
				</Input>
				<SlugSuggestions
					:selected="slug"
					:suggestions="slugSuggestions"
					:visible="showSlugSuggestions"
					@select="selectSlugSuggestion"
				/>
			</div>
			<div class="flex flex-col gap-2.5">
				<label for="owner">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.ownerLabel) }}
					</span>
				</label>
				<Combobox
					id="owner"
					v-model="owner"
					name="owner"
					:options="[userOption, ...ownerOptions]"
					searchable
					:disabled="hasHitLimit"
					select-search-text-on-focus
					show-icon-in-selected
				/>
				<span>{{ formatMessage(messages.ownerDescription) }}</span>
			</div>
			<div class="flex flex-col gap-2.5">
				<label for="visibility" class="flex flex-col gap-1">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(commonMessages.visibilityLabel) }}
					</span>
				</label>
				<Chips
					id="visibility"
					v-model="visibility"
					:items="visibilities"
					:format-label="(x) => x.display"
					:capitalize="false"
					:disabled="hasHitLimit"
				/>
				<span>{{ formatMessage(messages.visibilityDescription) }}</span>
			</div>
			<div class="flex flex-col gap-2.5">
				<label for="additional-information" class="flex flex-col gap-1">
					<span class="text-md font-semibold text-contrast">
						{{ formatMessage(messages.summaryLabel) }}
					</span>
				</label>
				<Textarea
					id="additional-information"
					v-model="description"
					:maxlength="256"
					:placeholder="formatMessage(messages.summaryPlaceholder)"
					:disabled="hasHitLimit"
				/>
				<span>{{ formatMessage(messages.summaryDescription) }}</span>
			</div>
			<div class="flex justify-end gap-2.5">
				<Button type="outlined" @click="cancel">
					<XIcon aria-hidden="true" />
					{{ formatMessage(commonMessages.cancelButton) }}
				</Button>
				<Button
					v-tooltip="missingFieldsTooltip"
					type="colored"
					color="brand"
					:disabled="disableCreate"
					@click="createProject"
				>
					<PlusIcon aria-hidden="true" />
					{{ formatMessage(messages.createProject) }}
				</Button>
			</div>
		</div>
	</NewModal>
</template>

<script setup lang="ts">
import type { Labrinth } from '@modrinth/api-client'
import { OrganizationIcon, PlusIcon, XIcon } from '@modrinth/assets'
import { Button } from '@modrinth/ui'
import {
	Chips,
	Combobox,
	type ComboboxOption,
	commonMessages,
	defineMessages,
	injectModrinthClient,
	injectNotificationManager,
	Input,
	NewModal,
	Textarea,
	useVIntl,
} from '@modrinth/ui'
import { computed, defineAsyncComponent, h } from 'vue'

import SlugSuggestions from '~/components/ui/SlugSuggestions.vue'
import {
	generateUrlSlug,
	useProjectSlugSuggestions,
	useSlugSuggestionVisibility,
} from '~/composables/project-slug-suggestions'

import CreateLimitAlert from './CreateLimitAlert.vue'
interface ShopTypeOption {
	stall: boolean
	display: string
}
interface VisibilityOption {
	actual: Labrinth.Projects.v2.ProjectStatus
	display: string
}

const { addNotification } = injectNotificationManager()
const { formatMessage } = useVIntl()
const router = useRouter()

defineExpose({
	show,
})

const auth = await useAuth()

const messages = defineMessages({
	title: {
		id: 'create.project.shop-title',
		defaultMessage: 'Creating a shop',
	},
	typeLabel: {
		id: 'create.shop.type-label',
		defaultMessage: 'Type',
	},
	typeShop: {
		id: 'create.shop.type-shop',
		defaultMessage: 'Shop',
	},
	typeStall: {
		id: 'create.shop.type-stall',
		defaultMessage: 'Stall',
	},
	ownerLabel: {
		id: 'create.project.owner-label',
		defaultMessage: 'Owner',
	},
	ownerDescription: {
		id: 'create.shop.owner-description',
		defaultMessage: `Set the shop owner as yourself or an organization you're a member of.`,
	},
	nameLabel: {
		id: 'create.project.name-label',
		defaultMessage: 'Name',
	},
	namePlaceholder: {
		id: 'create.shop.name-placeholder',
		defaultMessage: 'Enter shop name...',
	},
	urlLabel: {
		id: 'create.project.url-label',
		defaultMessage: 'URL',
	},
	visibilityDescription: {
		id: 'create.shop.visibility-description',
		defaultMessage: 'The visibility of your shop after it has been approved.',
	},
	summaryLabel: {
		id: 'create.project.summary-label',
		defaultMessage: 'Summary',
	},
	summaryDescription: {
		id: 'create.shop.summary-description',
		defaultMessage: 'A sentence or two that describes your shop.',
	},
	summaryPlaceholder: {
		id: 'create.shop.summary-placeholder',
		defaultMessage: 'This shop adds...',
	},
	createProject: {
		id: 'create.shop.create-project',
		defaultMessage: 'Create shop',
	},
	visibilityPublic: {
		id: 'create.project.visibility-public',
		defaultMessage: 'Public',
	},
	visibilityUnlisted: {
		id: 'create.project.visibility-unlisted',
		defaultMessage: 'Unlisted',
	},
	visibilityPrivate: {
		id: 'create.project.visibility-private',
		defaultMessage: 'Private',
	},
	missingFieldsTooltip: {
		id: 'create.project.missing-fields-tooltip',
		defaultMessage: 'Missing fields: {fields}',
	},
	unknownUser: {
		id: 'create.project.unknown-user',
		defaultMessage: 'Unknown user',
	},
	userAvatarAlt: {
		id: 'create.project.user-avatar-alt',
		defaultMessage: 'User Avatar',
	},
	organizationIconAlt: {
		id: 'create.project.organization-icon-alt',
		defaultMessage: '{name} Icon',
	},
})

const props = defineProps<{
	organizationId?: string | null
}>()

const modal = ref<InstanceType<typeof NewModal>>()
const hasHitLimit = ref(false)

const name = ref('')
const slug = ref('')
const description = ref('')
const manualSlug = ref(false)
const {
	onFocusIn: onSlugSuggestionFocusIn,
	onFocusOut: onSlugSuggestionFocusOut,
	visible: showSlugSuggestions,
} = useSlugSuggestionVisibility()
const { checking: checkingSlugSuggestions, suggestions: slugSuggestions } =
	useProjectSlugSuggestions({
		title: name,
		username: () => auth.value.user?.username,
	})
const ownerOptions = ref<ComboboxOption<string>[]>([])
const owner = ref<string | undefined>('self')
const organizations = ref<Labrinth.Projects.v3.Organization[]>([])
const visibilities = ref<VisibilityOption[]>([
	{
		actual: 'approved',
		display: formatMessage(messages.visibilityPublic),
	},
	{
		actual: 'unlisted',
		display: formatMessage(messages.visibilityUnlisted),
	},
	{
		actual: 'private',
		display: formatMessage(messages.visibilityPrivate),
	},
])
const visibility = ref<VisibilityOption>(visibilities.value[0])

const shopTypes = ref<ShopTypeOption[]>([
	{
		stall: false,
		display: formatMessage(messages.typeShop),
	},
	{
		stall: true,
		display: formatMessage(messages.typeStall),
	},
])
const shopType = ref<ShopTypeOption>(shopTypes.value[0])

const disableCreate = computed(() => {
	if (hasHitLimit.value) return true
	if (!name.value.trim() || !slug.value.trim()) return true
	if (!manualSlug.value && checkingSlugSuggestions.value) return true
	if (!manualSlug.value && !slugSuggestions.value.includes(slug.value)) return true
	if (description.value.trim().length < 3) return true
	if (owner.value !== 'self' && !organizations.value.find((org) => org.id === owner.value))
		return true
	return false
})

const missingFieldsTooltip = computed(() => {
	const missingFields = []
	if (!name.value.trim()) missingFields.push(formatMessage(messages.nameLabel))
	if (!slug.value.trim()) missingFields.push(formatMessage(messages.urlLabel))
	if (description.value.trim().length < 3) missingFields.push(formatMessage(messages.summaryLabel))
	if (owner.value !== 'self' && !organizations.value.find((org) => org.id === owner.value))
		missingFields.push(formatMessage(messages.ownerLabel))

	if (missingFields.length === 0) return ''
	return formatMessage(messages.missingFieldsTooltip, {
		fields: missingFields.join(', '),
	})
})

const cancel = () => {
	modal.value?.hide()
}

const userOption = computed(() => ({
	value: 'self',
	label: auth.value.user?.username || formatMessage(messages.unknownUser),
	icon: auth.value.user?.avatar_url
		? markRaw(
				defineAsyncComponent(() =>
					Promise.resolve({
						setup: () => () =>
							h('img', {
								src: auth.value.user?.avatar_url,
								alt: formatMessage(messages.userAvatarAlt),
								class: 'h-5 w-5 rounded-full',
							}),
					}),
				),
			)
		: undefined,
}))

const { labrinth } = injectModrinthClient()

async function fetchOrganizations() {
	if (!auth.value.user?.id) return

	try {
		const orgs = (await useBaseFetch(`user/${auth.value.user.id}/organizations`, {
			apiVersion: 3,
		})) as Labrinth.Projects.v3.Organization[]

		organizations.value = orgs || []

		ownerOptions.value = organizations.value.map((org) => ({
			value: org.id,
			label: org.name,
			icon: org.icon_url
				? markRaw(
						defineAsyncComponent(() =>
							Promise.resolve({
								setup: () => () =>
									h('img', {
										src: org.icon_url,
										alt: formatMessage(messages.organizationIconAlt, { name: org.name }),
										class: 'h-5 w-5 rounded',
									}),
							}),
						),
					)
				: markRaw(
						defineAsyncComponent(() =>
							Promise.resolve({
								setup: () => () => h(OrganizationIcon, { class: 'size-5' }),
							}),
						),
					),
		}))
		if (props.organizationId) owner.value = props.organizationId
	} catch (err) {
		console.error('Failed to fetch organizations:', err)
	}
}
async function createProject() {
	if (disableCreate.value) return
	startLoading()

	try {
		await labrinth.projects_v3.createShopProject({
			base: {
				name: name.value.trim(),
				slug: slug.value,
				summary: description.value.trim(),
				description: '',
				requested_status: visibility.value.actual,
				organization_id: owner.value !== 'self' ? owner.value : undefined,
			},
			shop: {
				stall: shopType.value.stall,
			},
		})

		modal.value?.hide()
		await router.push(`/project/${slug.value}/settings`)
	} catch (err: unknown) {
		const error = err as { data?: { description?: string } }
		addNotification({
			title: formatMessage(commonMessages.errorNotificationTitle),
			text: error.data?.description ?? String(err),
			type: 'error',
		})
	}
	stopLoading()
}

async function show(event?: MouseEvent) {
	name.value = ''
	slug.value = ''
	description.value = ''
	manualSlug.value = false
	showSlugSuggestions.value = false
	owner.value = 'self'
	shopType.value = shopTypes.value[0]
	await fetchOrganizations()
	modal.value?.show(event)
}

function updatedName() {
	if (!manualSlug.value) {
		slug.value = generateUrlSlug(name.value)
	}
}

function selectSlugSuggestion(suggestion: string) {
	slug.value = suggestion
	manualSlug.value = true
}

watch([slugSuggestions, checkingSlugSuggestions], ([suggestions, checking]) => {
	if (!manualSlug.value && !checking) slug.value = suggestions[0] ?? ''
})
</script>
