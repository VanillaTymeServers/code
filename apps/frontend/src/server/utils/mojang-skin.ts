const USER_AGENT = 'VanillaTymeWebsite/1.0 (vanillatyme.com)'
const UUID_PATTERN = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i
const NAME_PATTERN = /^\w{1,16}$/

/** How long a fetched skin is reused before Mojang is asked again. */
const SKIN_MAX_AGE = 60 * 60 * 6

/** A player's skin texture, or `missing` when they have no account or no custom skin. */
type CachedSkin = { missing: true } | { missing: false; png: string }

/** Thrown for Mojang errors worth retrying later (rate limits, outages), so they aren't cached. */
class MojangUnavailableError extends Error {}

export function isPlayerKey(player: string) {
	return UUID_PATTERN.test(player) || NAME_PATTERN.test(player)
}

async function mojangJson<T>(url: string): Promise<T | null> {
	const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
	if (response.status === 204 || response.status === 404) return null
	if (!response.ok) throw new MojangUnavailableError(`${url} returned ${response.status}`)
	return (await response.json()) as T
}

async function uuidFor(player: string): Promise<string | null> {
	if (UUID_PATTERN.test(player)) return player.replaceAll('-', '').toLowerCase()
	const profile = await mojangJson<{ id: string }>(
		`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(player)}`,
	)
	return profile?.id ?? null
}

async function fetchSkin(player: string): Promise<CachedSkin> {
	const uuid = await uuidFor(player)
	if (!uuid) return { missing: true }

	const profile = await mojangJson<{ properties?: { name: string; value: string }[] }>(
		`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
	)
	const textures = profile?.properties?.find((property) => property.name === 'textures')
	if (!textures) return { missing: true }

	const decoded = JSON.parse(Buffer.from(textures.value, 'base64').toString('utf8')) as {
		textures?: { SKIN?: { url?: string } }
	}
	const skinUrl = decoded.textures?.SKIN?.url
	if (!skinUrl) return { missing: true }

	const image = await fetch(skinUrl.replace(/^http:/, 'https:'), {
		headers: { 'User-Agent': USER_AGENT },
	})
	if (!image.ok) throw new MojangUnavailableError(`${skinUrl} returned ${image.status}`)
	return { missing: false, png: Buffer.from(await image.arrayBuffer()).toString('base64') }
}

/**
 * A player's skin texture (the flat 64×64 PNG) straight from Mojang, cached per player on this
 * server. When Mojang is unavailable the last copy keeps being served.
 */
export const getPlayerSkin = defineCachedFunction(fetchSkin, {
	name: 'player-skin',
	maxAge: SKIN_MAX_AGE,
	swr: true,
	getKey: (player: string) => player.replaceAll('-', '').toLowerCase(),
})

export { SKIN_MAX_AGE }
