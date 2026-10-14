import mysql from 'mysql2/promise'

import { readEnv } from '~/helpers/env'

let pool: Promise<mysql.Pool> | undefined

async function createGameDbPool(): Promise<mysql.Pool> {
	const [host, port, user, password, database] = await Promise.all([
		readEnv('GAME_DB_HOST'),
		readEnv('GAME_DB_PORT'),
		readEnv('GAME_DB_USER'),
		readEnv('GAME_DB_PASSWORD'),
		readEnv('GAME_DB_NAME'),
	])

	if (!host || !user || !database) {
		throw createError({ statusCode: 503, statusMessage: 'game database is not configured' })
	}

	return mysql.createPool({
		host,
		port: port ? Number(port) : 3306,
		user,
		password,
		database,
		connectionLimit: 5,
	})
}

/**
 * Shared connection pool for the Minecraft server's MySQL database (VotingPlugin and other
 * plugins), configured with the `GAME_DB_*` environment variables.
 */
export function useGameDb(): Promise<mysql.Pool> {
	pool ??= createGameDbPool().catch((error) => {
		pool = undefined
		throw error
	})
	return pool
}
