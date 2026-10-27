<template>
	<div v-if="pkg" class="flex flex-col gap-4">
		<ButtonLink to="/store" type="quiet" class="self-start">
			<ChevronLeftIcon aria-hidden="true" />
			{{ formatMessage(messages.backToStore) }}
		</ButtonLink>
		<div class="flex flex-col gap-6 rounded-2xl bg-bg-raised p-6 md:flex-row">
			<img
				v-if="pkg.image"
				:src="pkg.image"
				:alt="pkg.name"
				class="size-48 shrink-0 self-center rounded-xl bg-surface-2 object-contain p-4 md:self-start"
			/>
			<div class="flex min-w-0 flex-grow flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h1 class="m-0 text-3xl font-bold text-contrast">{{ pkg.name }}</h1>
					<span class="text-2xl font-bold text-brand">{{ price(pkg.total_price, pkg.currency) }}</span>
				</div>
				<div v-if="pkg.type === 'both' && pkg.expiry_period" class="flex flex-col gap-2">
					<span class="font-semibold text-contrast">{{ formatMessage(messages.purchaseType) }}</span>
					<Chips
						v-model="purchaseType"
						:items="['single', 'subscription'] as const"
						:format-label="formatPurchaseType"
						:capitalize="false"
					/>
				</div>
				<div v-if="basket" class="flex flex-wrap items-center gap-2">
					<span>{{ formatMessage(messages.buyingAs, { username: basket.username }) }}</span>
					<Button type="quiet" size="sm" @click="resetBasket">
						{{ formatMessage(messages.changePlayer) }}
					</Button>
				</div>
				<span v-else-if="auth.user">
					{{ formatMessage(messages.buyingAs, { username: auth.user.username }) }}
				</span>
				<div v-else class="flex flex-col gap-2">
					<label class="font-semibold text-contrast" for="store-username">
						{{ formatMessage(messages.usernameLabel) }}
					</label>
					<Input
						id="store-username"
						v-model="username"
						autocomplete="off"
						spellcheck="false"
						:placeholder="formatMessage(messages.usernamePlaceholder)"
						wrapper-class="w-full max-w-xs"
					/>
				</div>
				<div v-if="canGift" class="flex flex-col gap-2">
					<Checkbox v-model="isGift" :label="formatMessage(messages.giftLabel)" />
					<template v-if="isGift">
						<label for="store-gift-username" hidden>
							{{ formatMessage(messages.giftUsernamePlaceholder) }}
						</label>
						<Input
							id="store-gift-username"
							v-model="giftUsername"
							autocomplete="off"
							spellcheck="false"
							:placeholder="formatMessage(messages.giftUsernamePlaceholder)"
							wrapper-class="w-full max-w-xs"
						/>
					</template>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					<template v-if="inBasket">
						<span class="font-semibold text-brand">{{ formatMessage(messages.inCart) }}</span>
						<Button :disabled="removeMutation.isPending.value" @click="removeMutation.mutate(pkg.id)">
							<TrashIcon aria-hidden="true" />
							{{ formatMessage(messages.remove) }}
						</Button>
					</template>
					<Button
						v-else
						type="colored"
						color="brand"
						size="lg"
						:disabled="!canAdd || addMutation.isPending.value"
						@click="addToBasket"
					>
						<ShoppingCartIcon aria-hidden="true" />
						{{ formatMessage(messages.addToCart) }}
					</Button>
				</div>
			</div>
		</div>
		<div
			v-if="pkg.description"
			class="markdown-body rounded-2xl bg-bg-raised p-6"
			v-html="sanitizeStoreHtml(pkg.description)"
		/>
	</div>
</template>

<script setup lang="ts">
import { ModrinthApiError } from '@modrinth/api-client'
import { ChevronLeftIcon, ShoppingCartIcon, TrashIcon } from '@modrinth/assets'
import {
	Button,
	ButtonLink,
	Chips,
	Checkbox,
	defineMessages,
	injectModrinthClient,
	injectNotificationManager,
	Input,
	useVIntl,
} from '@modrinth/ui'
import { useQuery } from '@tanstack/vue-query'

import { storeQueryOptions } from '~/composables/queries/store'

const MINECRAFT_USERNAME = /^\w{3,16}$/

const { formatMessage } = useVIntl()
const route = useRoute()
const client = injectModrinthClient()
const { addNotification } = injectNotificationManager()
const auth = await useAuth()
const token = useStoreToken()
const price = useStorePrice()
const { basket, addMutation, removeMutation, resetBasket } = useStoreBasket()

const {
	data: pkg,
	error: pkgError,
	suspense: pkgSuspense,
} = useQuery(computed(() => storeQueryOptions.package(token, String(route.params.id), client)))
const { data: webstore, suspense: webstoreSuspense } = useQuery(
	storeQueryOptions.webstore(token, client),
)

/** Tebex answers an unknown package ID with a 400, not a 404. */
const isMissingPackage = (error: unknown) =>
	error instanceof ModrinthApiError && [400, 404].includes(error.statusCode ?? 0)

const notFound = () =>
	createError({ fatal: true, statusCode: 404, message: formatMessage(messages.packageNotFound) })

onServerPrefetch(async () => {
	const [result] = await Promise.all([pkgSuspense(), webstoreSuspense()])
	if (isMissingPackage(result.error)) throw notFound()
})

watch(pkgError, (error) => {
	if (isMissingPackage(error)) showError(notFound())
})

const purchaseType = ref<'single' | 'subscription'>('single')
const username = ref('')
const isGift = ref(false)
const giftUsername = ref('')

const buyerUsername = computed(() => auth.value.user?.username ?? username.value.trim())
const canGift = computed(() => !!webstore.value?.supports_gifting && !pkg.value?.disable_gifting)
const inBasket = computed(
	() => basket.value?.packages.some((item) => item.id === pkg.value?.id) ?? false,
)
const canAdd = computed(
	() =>
		(!!basket.value || MINECRAFT_USERNAME.test(buyerUsername.value)) &&
		(!isGift.value || MINECRAFT_USERNAME.test(giftUsername.value.trim())),
)

const messages = defineMessages({
	backToStore: {
		id: 'store.package.back',
		defaultMessage: 'Back to store',
	},
	purchaseType: {
		id: 'store.package.purchase-type',
		defaultMessage: 'Purchase type',
	},
	oneTime: {
		id: 'store.package.purchase-type.one-time',
		defaultMessage: 'One-time',
	},
	subscription: {
		id: 'store.package.purchase-type.subscription',
		defaultMessage: '{count, plural, one {Every {unit}} other {Every # {unit}s}}',
	},
	buyingAs: {
		id: 'store.package.buying-as',
		defaultMessage: 'Buying as {username}',
	},
	changePlayer: {
		id: 'store.package.change-player',
		defaultMessage: 'Change player',
	},
	usernameLabel: {
		id: 'store.package.username-label',
		defaultMessage: 'Your Minecraft username',
	},
	usernamePlaceholder: {
		id: 'store.package.username-placeholder',
		defaultMessage: 'Your in-game name',
	},
	addToCart: {
		id: 'store.package.add-to-cart',
		defaultMessage: 'Add to cart',
	},
	inCart: {
		id: 'store.package.in-cart',
		defaultMessage: 'In your cart',
	},
	remove: {
		id: 'store.package.remove',
		defaultMessage: 'Remove',
	},
	addedTitle: {
		id: 'store.package.added.title',
		defaultMessage: 'Added to cart',
	},
	addedText: {
		id: 'store.package.added.text',
		defaultMessage: '{name} is in your cart.',
	},
	addFailedTitle: {
		id: 'store.package.add-failed.title',
		defaultMessage: 'Could not add to cart',
	},
	packageNotFound: {
		id: 'store.package.not-found',
		defaultMessage: 'Package not found',
	},
		giftLabel: {
		id: 'store.package.gift-label',
		defaultMessage: 'Gift this to another player',
	},
	giftUsernamePlaceholder: {
		id: 'store.package.gift-username-placeholder',
		defaultMessage: "Recipient's Minecraft username",
	},
})

function formatPurchaseType(type: 'single' | 'subscription') {
	if (type === 'single' || !pkg.value?.expiry_period) return formatMessage(messages.oneTime)
	return formatMessage(messages.subscription, {
		count: pkg.value.expiry_period.count,
		unit: pkg.value.expiry_period.unit,
	})
}

function addToBasket() {
	const current = pkg.value
	if (!current) return
	const type = current.type === 'both' ? purchaseType.value : current.type

	addMutation.mutate(
		{
			packageIdent: current.ident,
			type,
			username: buyerUsername.value,
			giftTo: isGift.value ? giftUsername.value.trim() : undefined,
		},
		{
			onSuccess: () =>
				addNotification({
					type: 'success',
					title: formatMessage(messages.addedTitle),
					text: formatMessage(messages.addedText, { name: current.name }),
				}),
			onError: (error) =>
				addNotification({
					type: 'error',
					title: formatMessage(messages.addFailedTitle),
					text: error.message,
				}),
		},
	)
}

useSeoMeta({
	title: () => pkg.value?.name ?? '',
})
</script>
