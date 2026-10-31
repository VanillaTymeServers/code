import { SERVER_ADDRESS } from '~/helpers/homepage'

interface McStatusResponse {
	online: boolean
	players?: { online: number }
	version?: { name_clean: string }
}

export interface ServerStatus {
	online: boolean
	players: number
	version: string | null
}

/** Paper reports its version as `Paper 26.1.2`, so only the last word is the game version. */
function gameVersion(name?: string): string | null {
	return name?.trim().split(/\s+/).pop() ?? null
}

export default defineCachedEventHandler(
	async (): Promise<ServerStatus> => {
		try {
			const status = await $fetch<McStatusResponse>(
				`https://api.mcstatus.io/v2/status/java/${SERVER_ADDRESS}`,
				{ timeout: 5000 },
			)
			return {
				online: status.online,
				players: status.players?.online ?? 0,
				version: gameVersion(status.version?.name_clean),
			}
		} catch {
			return { online: false, players: 0, version: null }
		}
	},
	{ name: 'server-status', maxAge: 60 },
)
