import {
	boolean,
	date,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	uuid,
	jsonb
} from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const group = pgTable('group', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	url: text().notNull().unique(),
	owner: text('owner').references(() => user.id, {
		onDelete: 'set null'
	}),
	coverPhoto: text('cover_photo'),
	address: jsonb('address').default('[]'),
	contacts: jsonb('contacts').default('[]')
})

export const membership = pgTable('membership', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	groupId: uuid('group_id')
		.notNull()
		.references(() => group.id)
})

export const event = pgTable('event', {
	id: uuid().primaryKey().defaultRandom(),
	url: text().notNull().unique(),
	title: text().notNull(),
	description: text(),
	attachment: text().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().$onUpdateFn(() => new Date()),
	startTime: time('start_time').notNull(),
	startDate: date('start_date').notNull(),
	location: text('location').notNull(),
	isPublished: boolean('is_published').notNull().default(false),
	createdBy: text('user_id').references(() => user.id, { onDelete: 'cascade' })
})

export const attendanceStatusEnum = pgEnum('status', [
	'skipping',
	'going',
	'maybe'
])

export const attendees = pgTable('attendees', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	eventId: uuid('event_id')
		.notNull()
		.references(() => event.id),
	status: attendanceStatusEnum('status').notNull().default('skipping')
})
