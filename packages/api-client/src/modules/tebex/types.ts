export namespace Tebex {
	export namespace Headless {
		export type Response<T> = {
			data: T
		}

		export type Webstore = {
			id: number
			description: string
			name: string
			webstore_url: string
			currency: string
			lang: string
			logo: string | null
			platform_type: string
			platform_type_id: number
			created_at: string
			disabled: boolean
			supports_usernames: boolean
			supports_gifting: boolean
		}

		export type PackageType = 'single' | 'subscription' | 'both'

		export type PackageMedia = {
			type: 'video' | 'image'
			name: string | null
			url: string
			featured: boolean
			primary: boolean
		}

		export type Package = {
			id: number
			ident: string
			name: string
			slug: string | null
			description: string
			image: string | null
			media: PackageMedia[]
			type: PackageType
			category: {
				id: number
				name: string
			}
			base_price: number
			sales_tax: number
			total_price: number
			currency: string
			prorate_price?: number | null
			discount: number
			disable_quantity: boolean
			disable_gifting: boolean
			expiry_period?: {
				count: number
				unit: string
			}
			expiration_date: string | null
			user_limit: number | null
			created_at: string | null
			updated_at: string | null
			order: number
			creator_meta_data: Record<string, unknown> | null
			vip_status: string | null
		}

		export type Category = {
			id: number
			name: string
			slug: string | null
			parent: Category | null
			description: string
			tiered: boolean
			packages?: Package[]
			order: number
			display_type: 'list' | 'grid'
			image_url: string | null
			dynamic: boolean
		}

		export type SaleReference = {
			id: number
			name: string
		}

		export type Sale = {
			id: number
			name: string
			starts_at: string
			ends_at: string
			discount: {
				type: 'percentage' | 'amount' | 'commands'
				percentage: number | null
				amount: number | null
				currency: string
			}
			applies_to: {
				type: 'all' | 'package' | 'category' | 'variable_option'
				packages: SaleReference[]
				categories: SaleReference[]
				variable_options: SaleReference[]
				excluded_packages: SaleReference[]
			}
			requirements: {
				type: 'purchased_packages' | 'lifetime_spend' | 'minimum_basket_value'
				packages?: SaleReference[]
				match?: 'all'
				amount?: number
				currency?: string
			}[]
		}

		type SidebarModuleBase<Type extends string, Data> = {
			id: number
			type: Type
			start_time: string
			end_time: string | null
			data: Data
		}

		export type RecentPayment = {
			username: string
			username_id: string
			avatar_url?: string
			package: {
				name: string
			}
			created_at: string | null
			price: number | null
			currency: string | null
		}

		export type SidebarModule =
			| SidebarModuleBase<
					'top_customer',
					{
						header: string
						username: string
						username_id: string
						avatar_url?: string
						total?: number
					}
			  >
			| SidebarModuleBase<'textbox', { header: string; text: string }>
			| SidebarModuleBase<'recent_payments', { header: string; payments: RecentPayment[] }>
			| SidebarModuleBase<'featured_package', { header: string; package: Package }>
			| SidebarModuleBase<'giftcard_balance', { header: string }>
			| SidebarModuleBase<
					'server_status',
					{
						header: string
						hostname: string
						port: number
						online: boolean
						players: { online: number; max: number } | null
					}
			  >
			| SidebarModuleBase<
					'payment_goal',
					{
						header: string
						percentage: number
						bar_style: 'normal' | 'striped'
						bar_animated: boolean
						total: number | null
						target: number | null
					}
			  >
			| SidebarModuleBase<
					'community_goal',
					{
						header: string
						percentage: number
						bar_style: 'normal' | 'striped'
						bar_animated: boolean
						total_payments: number | null
						target: number | null
						times_achieved: number | null
					}
			  >

		export type BasketPackage = {
			id: number
			name: string
			slug: string | null
			description: string
			image: string | null
			in_basket: {
				quantity: number
				price: number
				gift_username_id: string | null
				gift_username: string | null
			}
			is_recurring: boolean
		}

		export type Basket = {
			ident: string
			complete: boolean
			id: number
			email: string | null
			country: string
			ip: string
			username_id: string | null
			username: string | null
			cancel_url: string
			complete_url: string | null
			complete_auto_redirect: boolean
			base_price: number
			sales_tax: number
			total_price: number
			currency: string
			packages: BasketPackage[]
			coupons: { code: string }[]
			giftcards: { card_number: string }[]
			creator_code: string | null
			links: { checkout?: string; payment?: string } | []
			custom?: Record<string, unknown> | null
		}

		export type CreateBasketRequest = {
			username?: string
			complete_url?: string
			cancel_url?: string
			complete_auto_redirect?: boolean
			custom?: Record<string, unknown>
		}

		export type AddBasketPackageRequest = {
			package_id: string
			quantity: number
			type: 'single' | 'subscription'
			target_username?: string
			target_username_id?: string
			dynamic?: boolean
		}
	}
}
