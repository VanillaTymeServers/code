import type { Labrinth } from '@modrinth/api-client'
import { defineMessages } from '../composables/i18n'

export const WOOL_COLORS: Record<Labrinth.Projects.v3.StallColor, string> = {
	white: '#e9ecec',
	light_gray: '#8e8e86',
	gray: '#3e4447',
	black: '#141519',
	brown: '#724728',
	red: '#a12722',
	orange: '#f07613',
	yellow: '#f8c627',
	lime: '#70b919',
	green: '#546d1b',
	cyan: '#158991',
	light_blue: '#3aafd9',
	blue: '#35399d',
	purple: '#792aac',
	magenta: '#bd44b3',
	pink: '#ed8dac',
}

export const stallColorMessages = defineMessages({
	white: { id: 'shop.stall-color.white', defaultMessage: 'White' },
	light_gray: { id: 'shop.stall-color.light-gray', defaultMessage: 'Light gray' },
	gray: { id: 'shop.stall-color.gray', defaultMessage: 'Gray' },
	black: { id: 'shop.stall-color.black', defaultMessage: 'Black' },
	brown: { id: 'shop.stall-color.brown', defaultMessage: 'Brown' },
	red: { id: 'shop.stall-color.red', defaultMessage: 'Red' },
	orange: { id: 'shop.stall-color.orange', defaultMessage: 'Orange' },
	yellow: { id: 'shop.stall-color.yellow', defaultMessage: 'Yellow' },
	lime: { id: 'shop.stall-color.lime', defaultMessage: 'Lime' },
	green: { id: 'shop.stall-color.green', defaultMessage: 'Green' },
	cyan: { id: 'shop.stall-color.cyan', defaultMessage: 'Cyan' },
	light_blue: { id: 'shop.stall-color.light-blue', defaultMessage: 'Light blue' },
	blue: { id: 'shop.stall-color.blue', defaultMessage: 'Blue' },
	purple: { id: 'shop.stall-color.purple', defaultMessage: 'Purple' },
	magenta: { id: 'shop.stall-color.magenta', defaultMessage: 'Magenta' },
	pink: { id: 'shop.stall-color.pink', defaultMessage: 'Pink' },
})

export const shopMessages = defineMessages({
	stallLabel: { id: 'shop.stall-label', defaultMessage: '{color} stall' },
	coordinatesLabel: { id: 'shop.coordinates-label', defaultMessage: 'Coordinates' },
})