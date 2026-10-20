import { AbstractModule } from '../../../core/abstract-module'
import type { Labrinth } from '../types'

export class LabrinthVtInternalModule extends AbstractModule {
	public getModuleID(): string {
		return 'labrinth_vt_internal'
	}

	/**
	 * Get the account a claim link from the Minecraft server's /register command belongs to.
	 *
	 * @param flow - Code from the claim link
	 */
	public async getClaim(flow: string): Promise<Labrinth.Vt.Internal.ClaimInfo> {
		return this.client.request<Labrinth.Vt.Internal.ClaimInfo>(
			`/vt/claim/${encodeURIComponent(flow)}`,
			{
				api: 'labrinth',
				version: 'internal',
				method: 'GET',
			},
		)
	}

	/**
	 * Set the email and password of an account created from the Minecraft server, and log in.
	 *
	 * @param data - Claim link code, email and password
	 * @returns Promise resolving to the new session
	 */
	public async claim(
		data: Labrinth.Vt.Internal.ClaimAccountRequest,
	): Promise<Labrinth.Vt.Internal.ClaimAccountResponse> {
		return this.client.request<Labrinth.Vt.Internal.ClaimAccountResponse>('/vt/claim', {
			api: 'labrinth',
			version: 'internal',
			method: 'POST',
			body: data,
		})
	}
}
