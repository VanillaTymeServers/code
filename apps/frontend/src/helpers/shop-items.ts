import { items } from '@vanillatyme/mc-items'

/**
 * Item IDs that can't be listed in shop inventories or used as a price, because players can't
 * obtain them in survival on Vanilla Tyme. Add or remove IDs here; the item pickers and the
 * discover "Sells" filter all read from this list.
 */
export const BLOCKED_SHOP_ITEMS = new Set<string>([
	'barrier',
	'bedrock',
	'budding_amethyst',
	'chain_command_block',
	'command_block',
	'command_block_minecart',
	'debug_stick',
	'dirt_path',
	'end_portal_frame',
	'farmland',
	'frogspawn',
	'infested_chiseled_stone_bricks',
	'infested_cobblestone',
	'infested_cracked_stone_bricks',
	'infested_deepslate',
	'infested_mossy_stone_bricks',
	'infested_stone',
	'infested_stone_bricks',
	'jigsaw',
	'knowledge_book',
	'light',
	'petrified_oak_slab',
	'player_head',
	'reinforced_deepslate',
	'repeating_command_block',
	'spawner',
	'structure_block',
	'structure_void',
	'test_block',
	'test_instance_block',
	'trial_spawner',
	'vault',
])

/** Every item that can be sold or used as a price, as `{ id, name }`. */
export const shopItems = Object.entries(items)
	.filter(([id]) => !BLOCKED_SHOP_ITEMS.has(id))
	.map(([id, name]) => ({ id, name }))
