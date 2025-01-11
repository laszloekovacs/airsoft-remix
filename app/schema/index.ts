import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const testingTable = sqliteTable('testing', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull()
})
