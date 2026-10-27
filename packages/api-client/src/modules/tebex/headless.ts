import { AbstractModule } from '../../core/abstract-module'
import type { RequestOptions } from '../../types/request'
import type { Tebex } from './types'

const TEBEX_HEADLESS_URL = 'https://headless.tebex.io'

/**
 * Tebex Headless API, for building a store on top of a Tebex webstore.
 * Store endpoints take the webstore's public token, basket package endpoints only the basket ident.
 */
export class TebexHeadlessModule extends AbstractModule {
	public getModuleID(): string {
		return 'tebex_headless'
	}

	public async getWebstore(token: string): Promise<Tebex.Headless.Webstore> {
		return this.requestData(`/accounts/${token}`)
	}

	public async getCategories(token: string): Promise<Tebex.Headless.Category[]> {
		return this.requestData(`/accounts/${token}/categories`, {
			params: { includePackages: '1' },
		})
	}

	public async getCategory(token: string, categoryId: number): Promise<Tebex.Headless.Category> {
		return this.requestData(`/accounts/${token}/categories/${categoryId}`, {
			params: { includePackages: '1' },
		})
	}

	public async getPackage(
		token: string,
		packageId: string | number,
	): Promise<Tebex.Headless.Package> {
		return this.requestData(`/accounts/${token}/packages/${packageId}`)
	}

	public async getSales(token: string): Promise<Tebex.Headless.Sale[]> {
		return this.requestData(`/accounts/${token}/sales`)
	}

	public async getSidebar(token: string): Promise<Tebex.Headless.SidebarModule[]> {
		return this.requestData(`/accounts/${token}/sidebar`)
	}

	public async createBasket(
		token: string,
		data: Tebex.Headless.CreateBasketRequest,
	): Promise<Tebex.Headless.Basket> {
		return this.requestData(`/accounts/${token}/baskets`, { method: 'POST', body: data })
	}

	public async getBasket(token: string, basketIdent: string): Promise<Tebex.Headless.Basket> {
		return this.requestData(`/accounts/${token}/baskets/${basketIdent}`)
	}

	public async addPackage(
		basketIdent: string,
		data: Tebex.Headless.AddBasketPackageRequest,
	): Promise<Tebex.Headless.Basket> {
		return this.requestData(`/baskets/${basketIdent}/packages`, { method: 'POST', body: data })
	}

	public async removePackage(
		basketIdent: string,
		packageId: string,
	): Promise<Tebex.Headless.Basket> {
		return this.requestData(`/baskets/${basketIdent}/packages/remove`, {
			method: 'POST',
			body: { package_id: packageId },
		})
	}

	public async updatePackageQuantity(
		basketIdent: string,
		packageId: string,
		quantity: number,
	): Promise<void> {
		await this.client.request(`/baskets/${basketIdent}/packages/${packageId}`, {
			api: TEBEX_HEADLESS_URL,
			version: 'api',
			method: 'PUT',
			body: { quantity },
			skipAuth: true,
		})
	}

	private async requestData<T>(
		path: string,
		options: Omit<RequestOptions, 'api' | 'version'> = {},
	): Promise<T> {
		const response = await this.client.request<Tebex.Headless.Response<T>>(path, {
			api: TEBEX_HEADLESS_URL,
			version: 'api',
			skipAuth: true,
			...options,
		})
		return response.data
	}
}
