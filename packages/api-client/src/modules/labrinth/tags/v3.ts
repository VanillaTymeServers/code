import { AbstractModule } from '../../../core/abstract-module'
import type { Labrinth } from '../types'

export class LabrinthTagsV3Module extends AbstractModule {
	public getModuleID(): string {
		return 'labrinth_tags_v3'
	}

	/** Get every Vanilla Tyme season, newest first, with the current one flagged. */
	public async getSeasons(): Promise<Labrinth.Tags.v3.Season[]> {
		return this.client.request<Labrinth.Tags.v3.Season[]>('/tag/season', {
			api: 'labrinth',
			version: 3,
			method: 'GET',
		})
	}
}
