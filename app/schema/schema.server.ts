import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	email: text().notNull().unique(),
	avatar_url: text().notNull(),
	claims: text().array().default([]).notNull()
})
