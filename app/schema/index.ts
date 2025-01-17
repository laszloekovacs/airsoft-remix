import {
	boolean,
	date,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const group = pgTable('group', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	url: text().notNull().unique(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id)
})

export const members = pgTable('members', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	groupId: text('group_id')
		.notNull()
		.references(() => group.id)
})

export const calendarEvent = pgTable('calendar_event', {
	id: uuid().primaryKey().defaultRandom(),
	url: text().notNull().unique(),
	title: text().notNull(),
	description: text(),
	attachment: text().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().$onUpdateFn(() => new Date()),
	createdBy: text('user_id').references(() => user.id),
	organization: uuid('organization').references(() => group.id),
	startTime: time('start_time').notNull(),
	startDate: date('start_date').notNull(),
	location: text('location').notNull(),
	isPublished: boolean('is_published').notNull().default(false)
})

export const attendanceStatus = pgEnum('status', ['skipping', 'going', 'maybe'])

export const attendees = pgTable('attendees', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	eventId: text('event_id')
		.notNull()
		.references(() => calendarEvent.id),
	status: attendanceStatus('status').notNull().default('skipping')
})
