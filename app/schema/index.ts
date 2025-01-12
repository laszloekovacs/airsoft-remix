import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { user } from './auth-schema'

export const group = sqliteTable('group', {
	id: integer().primaryKey(),
	name: text().notNull(),
	metadata: text()
})

export const post = sqliteTable('post', {
	id: integer().primaryKey(),
	title: text().notNull(),
	content: text(),
	attachment: text().notNull(),
	createdAt: integer({ mode: 'timestamp' }).notNull(),
	updatedAt: integer({ mode: 'timestamp' }).notNull(),
	userId: text().references(() => user.id),
	groupId: text().references(() => group.id)
})
