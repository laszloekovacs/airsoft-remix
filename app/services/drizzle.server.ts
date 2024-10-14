import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!
})

export const db = drizzle(pool)

// admindb = drizzle(otherpool)

// get an uuid from postgres database, move this function somewhere else
export const genPostgresUUID = async () => {
	const { rows } = await db.execute(sql`SELECT gen_random_uuid() as uuid`)
	return rows[0].uuid
}
