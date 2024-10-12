import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	email: text().notNull().unique(),
	avatar_url: text().notNull()
})
