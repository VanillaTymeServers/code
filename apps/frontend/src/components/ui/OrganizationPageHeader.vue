<template>
	<PageHeader :title="organization.name" :summary="organization.description">
		<template #leading>
			<Avatar
				:src="organization.icon_url"
				:raw-src="organization.raw_icon_url"
				:alt="organization.name"
				:tint-by="organization.id"
				size="96px"
			/>
		</template>

		<template #badges>
			<PageHeaderBadgeItem :icon="OrganizationIcon" class="px-0 text-primary">
				{{ formatMessage(messages.organizationLabel) }}
			</PageHeaderBadgeItem>
		</template>

		<template #metadata>
			<PageHeaderMetadata>
				<PageHeaderMetadataNumberItem
					:icon="UsersIcon"
					:value="membersCount"
					:label="formatMessage(messages.membersLabel)"
				/>
			</PageHeaderMetadata>
		</template>

		<template #actions>
			<PageHeaderActions>
				<ButtonLink v-if="canManage" size="xl" :to="`/organization/${organization.slug}/settings`">
					<SettingsIcon />
					{{ formatMessage(messages.manage) }}
				</ButtonLink>
				<TeleportOverflowMenu
					type="quiet"
					size="xl"
					:label="formatMessage(commonMessages.moreOptionsButton)"
					:tooltip="formatMessage(commonMessages.moreOptionsButton)"
					:options="moreActions"
				>
					<MoreVerticalIcon />
				</TeleportOverflowMenu>
			</PageHeaderActions>
		</template>
	</PageHeader>
</template>

<script setup lang="ts">
import {
	ClipboardCopyIcon,
	MoreVerticalIcon,
	OrganizationIcon,
	SettingsIcon,
	UsersIcon,
} from '@modrinth/assets'
import { ButtonLink, TeleportOverflowMenu } from '@modrinth/ui'
import {
	Avatar,
	type ButtonMenuOption,
	commonMessages,
	defineMessages,
	PageHeader,
	PageHeaderActions,
	PageHeaderBadgeItem,
	PageHeaderMetadata,
	PageHeaderMetadataNumberItem,
	useVIntl,
} from '@modrinth/ui'
import { computed } from 'vue'

const messages = defineMessages({
	manage: {
		id: 'organization.button.manage',
		defaultMessage: 'Manage',
	},
	membersLabel: {
		id: 'organization.label.members',
		defaultMessage: 'members',
	},
	organizationLabel: {
		id: 'organization.label.organization',
		defaultMessage: 'Organization',
	},
})

defineProps<{
	organization: {
		id: string
		name: string
		slug: string
		description?: string | null
		icon_url?: string | null
	}
	membersCount: number
	canManage?: boolean
}>()

const emit = defineEmits<{
	copyId: []
	copyPermalink: []
}>()

const { formatMessage } = useVIntl()

const moreActions = computed<ButtonMenuOption[]>(() => [
	{
		id: 'copy-id',
		label: formatMessage(commonMessages.copyIdButton),
		icon: ClipboardCopyIcon,
		action: () => emit('copyId'),
	},
	{
		id: 'copy-permalink',
		label: formatMessage(commonMessages.copyPermalinkButton),
		icon: ClipboardCopyIcon,
		action: () => emit('copyPermalink'),
	},
])
</script>
