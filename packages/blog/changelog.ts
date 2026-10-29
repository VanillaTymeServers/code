import dayjs from 'dayjs'

export type Product = 'web'

export type VersionEntry = {
	date: dayjs.Dayjs
	product: Product
	version?: string
	body: string
}

const VERSIONS: VersionEntry[] = [].map((x) => ({ ...x, date: dayjs(x.date) }) as VersionEntry)

export function getChangelog() {
	return VERSIONS
}
