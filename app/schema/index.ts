import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { user } from './auth-schema'

export const group = sqliteTable('group', {
	id: text().primaryKey(),
	name: text().notNull()
})

export const post = sqliteTable('post', {
	id: text().primaryKey(),
	title: text().notNull(),
	content: text(),
	attachment: text().notNull(),
	createdAt: integer({ mode: 'timestamp' }).notNull(),
	updatedAt: integer({ mode: 'timestamp' }).notNull(),
	userId: text('user_id').references(() => user.id),
	groupId: text('group_id').references(() => group.id)
})

export const user_group = sqliteTable('user_group', {
	id: integer().primaryKey(),
	userId: text('user_id').references(() => user.id),
	groupId: text('group_id').references(() => group.id)
})
