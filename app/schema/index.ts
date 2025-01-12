import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { user } from './auth-schema'

export const group = sqliteTable('group', {
	id: integer().primaryKey(),
	name: text().notNull(),
	metadata: text()
})

export const post = sqliteTable('post', {
	id: integer('id').primaryKey(),
	title: text().notNull(),
	content: text(),
	attachment: text().notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	groupId: text('group_id').references(() => group.id)
})
