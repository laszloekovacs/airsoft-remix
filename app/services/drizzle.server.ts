import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!
})

export const db = drizzle(pool)

// admindb = drizzle(otherpool)

/**
 * Get a random UUID from Postgres database.
 * call server side
 * @returns a string representing an UUID
 */
export const genPostgresUUID = async (): Promise<string> => {
	const { rows } = await db.execute(sql`SELECT gen_random_uuid() as uuid`)
	return rows[0].uuid as string
}
