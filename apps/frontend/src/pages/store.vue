<template>
	<div>
		<div class="landing-hero">
			<h1 class="main-header">
				{{ formatMessage(messages.heroPre) }}
				<span class="main-header-strong">{{ formatMessage(messages.heroAccent) }}</span>
			</h1>
			<h2 class="main-subheader">{{ formatMessage(messages.heroSubtitle) }}</h2>
		</div>
		<div class="new-page sidebar alt-layout sidebar-top">
			<div class="normal-page__header mb-4 flex flex-col gap-4">
				<Admonition
					v-if="route.query.purchase === 'complete'"
					type="success"
					:header="formatMessage(messages.purchaseCompleteTitle)"
					:body="formatMessage(messages.purchaseCompleteBody)"
				/>
				<div class="flex justify-end">
					<Button type="colored" color="brand" @click="cartModal?.show()">
						<ShoppingCartIcon aria-hidden="true" />
						{{ formatMessage(messages.cart, { count: basket?.packages.length ?? 0 }) }}
					</Button>
				</div>
			</div>
			<aside class="normal-page__sidebar">
				<StoreSidebar />
			</aside>
			<div class="normal-page__content">
				<NuxtPage />
			</div>
		</div>
		<StoreCartModal ref="cartModal" />
	</div>
</template>

<script lang="ts" setup>
import { ShoppingCartIcon } from '@modrinth/assets'
import { Admonition, Button, defineMessages, useVIntl } from '@modrinth/ui'

import StoreCartModal from '~/components/ui/store/StoreCartModal.vue'
import StoreSidebar from '~/components/ui/store/StoreSidebar.vue'

const { formatMessage } = useVIntl()
const route = useRoute()
const { basket } = useStoreBasket()

const cartModal = ref<InstanceType<typeof StoreCartModal>>()

const messages = defineMessages({
	heroPre: {
		id: 'store.hero.pre',
		defaultMessage: 'Support',
	},
	heroAccent: {
		id: 'store.hero.accent',
		defaultMessage: 'Vanilla Tyme',
	},
	heroSubtitle: {
		id: 'store.hero.subtitle',
		defaultMessage: 'When you make a donation, you are helping to keep our servers running.',
	},
	cart: {
		id: 'store.cart.button',
		defaultMessage: 'Cart ({count})',
	},
	purchaseCompleteTitle: {
		id: 'store.purchase-complete.title',
		defaultMessage: 'Thank you for your support!',
	},
	purchaseCompleteBody: {
		id: 'store.purchase-complete.body',
		defaultMessage:
			'Your purchase is being processed. Perks are applied in game within a few minutes.',
	},
})

useSeoMeta({
	title: () => `${formatMessage(messages.heroPre)} ${formatMessage(messages.heroAccent)}`,
	description: () => formatMessage(messages.heroSubtitle),
})
</script>

<style scoped lang="scss">
.new-page.sidebar-top {
	@media screen and (max-width: 1023.98px) {
		grid-template:
			'header'
			'sidebar'
			'content'
			/ 100%;
	}
}

.landing-hero {
	position: relative;
	padding: 6rem 1rem 4rem 1rem;
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
</style>
