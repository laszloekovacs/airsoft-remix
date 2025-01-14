import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const group = pgTable('group', {
	id: text().primaryKey().generatedAlwaysAs('uuid_generate_v4()'),
	name: text().notNull()
})

export const post = pgTable('post', {
	id: text().primaryKey().generatedAlwaysAs('uuid_generate_v4()'),
	title: text().notNull(),
	content: text(),
	attachment: text().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow(),
	userId: text('user_id').references(() => user.id),
	groupId: text('group_id').references(() => group.id)
})

export const user_group = pgTable('user_group', {
	id: text().primaryKey().generatedAlwaysAs('uuid_generate_v4()'),
	userId: text('user_id').references(() => user.id),
	groupId: text('group_id').references(() => group.id)
})
