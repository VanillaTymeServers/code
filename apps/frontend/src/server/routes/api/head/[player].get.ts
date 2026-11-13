import { getPlayerSkin, isPlayerKey, SKIN_MAX_AGE } from '~/server/utils/mojang-skin'

/**
 * A player's skin texture by UUID or username, for `PlayerHead` to draw the face from.
 * 404 when the player doesn't exist or has no custom skin, so the page shows a placeholder.
 */
export default defineEventHandler(async (event) => {
	const player = getRouterParam(event, 'player') ?? ''
	if (!isPlayerKey(player)) {
		throw createError({ statusCode: 400, statusMessage: 'invalid player' })
	}

	const skin = await getPlayerSkin(player).catch(() => {
		throw createError({ statusCode: 503, statusMessage: 'skin unavailable' })
	})
	if (skin.missing) {
		throw createError({ statusCode: 404, statusMessage: 'no skin' })
	}

	setResponseHeaders(event, {
		'Content-Type': 'image/png',
		'Cache-Control': `public, max-age=${SKIN_MAX_AGE}`,
	})
	return Buffer.from(skin.png, 'base64')
})
