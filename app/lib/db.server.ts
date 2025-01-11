import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

const dbname = process.env.DB_FILE_NAME || ':memory:'

const database = new Database(dbname, {
	create: true
})
export const db = drizzle(database)
