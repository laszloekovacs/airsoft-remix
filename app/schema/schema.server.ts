/**
 * @module
 * @description Drizzle documentation: https://orm.drizzle.team/docs/overview
 */

import {
	boolean,
	json,
	pgTable,
	text,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	email: text().notNull().unique(),
	avatar_url: text(),
	claims: text().array().default([]).notNull(),
	password: text(),
	created_at: timestamp({ withTimezone: true }).defaultNow(),
	activated: boolean().default(false)
})

export const events = pgTable('events', {
	id: uuid().primaryKey().defaultRandom(),
	title: text().notNull(),
	creator_id: uuid()
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		}),

	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),

	start_time: timestamp({ withTimezone: true }).notNull().defaultNow(),

	location: text().notNull(),

	// the article. store it as a json
	text_mdx: text().default('').notNull(),
	text_json: json().default({}).notNull()
})
