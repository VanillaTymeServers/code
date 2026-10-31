export const SERVER_ADDRESS = 'play.vanillatyme.com'
export const DISCORD_URL = 'https://discord.vanillatymeservers.com'

export const LIVE_MAP_URL = 'https://map.vanillatyme.com'

/** Update both values at every reset. */
export const SEASON = {
	number: 11,
	startsAt: '2026-11-06T00:00:00Z',
}

export interface HomepageCompetition {
	theme: string
	/** ISO date. The competition stops showing as live once this has passed. */
	endsAt: string
}

export interface HomepagePodium {
	first: string
	second: string
	third: string
}

/** Set to `null` when no competition is running. */
export const CURRENT_COMPETITION: HomepageCompetition | null = null

/** Minecraft usernames from the last competition. The podium shows empty outlines while this is `null`. */
export const LAST_PODIUM: HomepagePodium | null = null
