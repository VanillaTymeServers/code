<template>
	<NewModal ref="modal" :header="formatMessage(messages.title)" max-width="32rem">
		<div v-if="basket && basket.packages.length" class="flex flex-col gap-4">
			<span class="text-secondary">
				{{ formatMessage(messages.buyingAs, { username: basket.username }) }}
			</span>
			<div
				v-for="item in basket.packages"
				:key="item.id"
				class="flex items-center gap-3 rounded-xl bg-surface-2 p-3"
			>
				<img
					v-if="item.image"
					:src="item.image"
					:alt="item.name"
					class="size-12 shrink-0 rounded-lg object-contain"
				/>
				<div class="flex min-w-0 flex-grow flex-col">
					<span class="truncate font-semibold text-contrast">{{ item.name }}</span>
					<span class="text-sm text-secondary">
						{{ formatMessage(item.is_recurring ? messages.recurring : messages.oneTime) }}
					</span>
					<span v-if="item.in_basket.gift_username" class="text-sm text-secondary">
						{{ formatMessage(messages.giftFor, { username: item.in_basket.gift_username }) }}
					</span>
				</div>
				<span class="font-semibold text-contrast">
					{{ price(item.in_basket.price, basket.currency) }}
				</span>
				<Button
					type="quiet"
					:aria-label="formatMessage(messages.remove)"
					:disabled="removeMutation.isPending.value"
					@click="removeMutation.mutate(item.id)"
				>
					<TrashIcon aria-hidden="true" />
				</Button>
			</div>
			<div class="flex flex-col gap-1 border-0 border-t border-solid border-surface-5 pt-3">
				<div v-if="basket.sales_tax > 0" class="flex justify-between text-secondary">
					<span>{{ formatMessage(messages.tax) }}</span>
					<span>{{ price(basket.sales_tax, basket.currency) }}</span>
				</div>
				<div class="flex justify-between text-lg font-bold text-contrast">
					<span>{{ formatMessage(messages.total) }}</span>
					<span>{{ price(basket.total_price, basket.currency) }}</span>
				</div>
			</div>
		</div>
		<p v-else class="m-0 text-secondary">{{ formatMessage(messages.empty) }}</p>
		<template #actions>
			<div class="flex justify-end gap-2">
				<Button @click="modal?.hide()">{{ formatMessage(messages.keepShopping) }}</Button>
				<Button
					v-if="basket?.packages.length"
					type="colored"
					color="brand"
					:disabled="launching"
					@click="checkout"
				>
					<LockIcon aria-hidden="true" />
					{{ formatMessage(messages.checkout) }}
				</Button>
			</div>
		</template>
	</NewModal>
</template>

<script setup lang="ts">
import { LockIcon, TrashIcon } from '@modrinth/assets'
import { Button, defineMessages, NewModal, useVIntl } from '@modrinth/ui'

const { formatMessage } = useVIntl()
const price = useStorePrice()
const { basket, removeMutation, resetBasket } = useStoreBasket()

const modal = ref<InstanceType<typeof NewModal>>()
const launching = ref(false)
let listeningForPayment = false

const messages = defineMessages({
	title: {
		id: 'store.cart.title',
		defaultMessage: 'Your cart',
	},
	buyingAs: {
		id: 'store.cart.buying-as',
		defaultMessage: 'Buying as {username}',
	},
	oneTime: {
		id: 'store.cart.one-time',
		defaultMessage: 'One-time',
	},
	recurring: {
		id: 'store.cart.recurring',
		defaultMessage: 'Recurring',
	},
	remove: {
		id: 'store.cart.remove',
		defaultMessage: 'Remove from cart',
	},
	tax: {
		id: 'store.cart.tax',
		defaultMessage: 'Tax',
	},
	total: {
		id: 'store.cart.total',
		defaultMessage: 'Total',
	},
	empty: {
		id: 'store.cart.empty',
		defaultMessage: 'Your cart is empty.',
	},
	keepShopping: {
		id: 'store.cart.keep-shopping',
		defaultMessage: 'Keep shopping',
	},
	checkout: {
		id: 'store.cart.checkout',
		defaultMessage: 'Checkout',
	},
	giftFor: {
		id: 'store.cart.gift-for',
		defaultMessage: 'Gift for {username}',
	},
})

async function checkout() {
	if (!basket.value) return
	launching.value = true
	try {
		const { default: Tebex } = await import('@tebexio/tebex.js')
		const brand = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-brand')
			.trim()

		Tebex.checkout.init({
			ident: basket.value.ident,
			theme: 'auto',
			colors: brand ? [{ name: 'primary', color: brand }] : [],
		})
		if (!listeningForPayment) {
			Tebex.checkout.on('payment:complete', onPaymentComplete)
			listeningForPayment = true
		}

		modal.value?.hide()
		Tebex.checkout.launch()
	} finally {
		launching.value = false
	}
}

function onPaymentComplete() {
	resetBasket()
	navigateTo({ path: '/store', query: { purchase: 'complete' } })
}

defineExpose({
	show: () => modal.value?.show(),
})
</script>
