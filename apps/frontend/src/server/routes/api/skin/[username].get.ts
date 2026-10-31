const ONE_DAY = 60 * 60 * 24

/** VZGE refuses image requests from browsers, so skin renders are fetched here instead. */
export default defineEventHandler(async (event) => {
	const username = getRouterParam(event, 'username') ?? ''
	if (!/^\w{1,16}$/.test(username)) {
		throw createError({ statusCode: 400, statusMessage: 'invalid username' })
	}

	const response = await $fetch
		.raw<ArrayBuffer>(`https://vzge.me/full/384/${username}`, {
			responseType: 'arrayBuffer',
			headers: { 'User-Agent': 'VanillaTymeWebsite/1.0 (vanillatyme.com)' },
			timeout: 10000,
		})
		.catch(() => {
			throw createError({ statusCode: 404, statusMessage: 'skin not found' })
		})

	setResponseHeaders(event, {
		'Content-Type': response.headers.get('content-type') ?? 'image/webp',
		'Cache-Control': `public, max-age=${ONE_DAY}`,
	})
	return Buffer.from(response._data as ArrayBuffer)
})
