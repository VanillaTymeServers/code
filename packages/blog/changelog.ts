import dayjs from 'dayjs'

export type Product = 'web'

export type VersionEntry = {
	date: dayjs.Dayjs
	product: Product
	version?: string
	body: string
}

const VERSIONS: VersionEntry[] = [
	{
		date: `2026-11-07T17:00:00Z`,
		product: 'web',
		body: `## The new Vanilla Tyme website

Welcome to the new site for Season 11!

### Shops
- Shop and stall owners can now list their shop on the website, with its own page, coordinates, gallery and description. It's optional.
- List everything you sell, with prices in any currency, sales, and items marked as popular or sold out.
- Sell full shulker boxes and show exactly what's inside.
- Find who sells an item with the **Sells** filter on Discover.
- Open any shop's location straight on the live map.

### Accounts
- Run \`/register\` in-game to create your account, then set your email and password. When shops open.
- Your profile picture is your Minecraft skin.
- Usernames are linked to your Minecraft UUID.

### Everything else
- Server rules, market rules and the vote leaderboard are all on the site.
- Shops are reviewed by staff, including an in-game visit, before they go public.`,
	},
].map((x) => ({ ...x, date: dayjs(x.date) }) as VersionEntry)

export function getChangelog() {
	return VERSIONS
}
