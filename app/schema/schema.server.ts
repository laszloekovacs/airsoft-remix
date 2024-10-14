/**
 * @module
 * @description Drizzle documentation: https://orm.drizzle.team/docs/overview
 */

import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm/sql'

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	email: text().notNull().unique(),
	avatar_url: text().notNull(),
	claims: text().array().default([]).notNull()
})

export const events = pgTable('events', {
	id: uuid().primaryKey().defaultRandom(),
	title: text().notNull(),
	creator_id: uuid()
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		}),

	created_at: timestamp({ withTimezone: true })
		.notNull()
		.default(sql`now()`),

	start_time: timestamp({ withTimezone: true })
		.notNull()
		.default(sql`now()`),

	location: text().notNull(),

	// the article. store it as a json
	text_mdx: text().default('').notNull(),
	text_json: json().default({}).notNull()
})
