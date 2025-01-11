import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

const database = new Database(process.env.DB_FILE_NAME!, {
	create: true
})
export const db = drizzle(database)
