import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const group = pgTable('group', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	url: text().notNull().unique()
})

export const post = pgTable('post', {
	id: uuid().primaryKey().defaultRandom(),
	title: text().notNull(),
	content: text(),
	attachment: text().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow(),
	userId: text('user_id').references(() => user.id)
	//groupId: uuid('group_id').references(() => group.id)
})
