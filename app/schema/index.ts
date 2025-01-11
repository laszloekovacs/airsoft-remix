import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const testingTable = sqliteTable('testing', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull()
})

export const uploadLogs = sqliteTable('upload_logs', {
	id: integer().primaryKey(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	key: text().notNull()
})
