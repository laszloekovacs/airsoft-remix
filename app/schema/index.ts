import {
	boolean,
	date,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const event = pgTable('event', {
	id: uuid().primaryKey().defaultRandom(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().$onUpdateFn(() => new Date()),
	title: text().notNull(),
	url: text().notNull().unique(),
	description: text(),
	coverPhoto: text('cover_photo'),
	startDate: date('start_date').notNull(),
	address: jsonb(),
	isPublished: boolean('is_published').notNull().default(false),
	createdBy: text('created_by').references(() => user.id, {
		onDelete: 'set null'
	})
})

export const attendanceInterest = pgEnum('attendance_interest', [
	'skipping',
	'going',
	'maybe'
])

export const user_to_event_attendance = pgTable('attendees', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id)
		.unique(),
	eventId: uuid('event_id')
		.notNull()
		.references(() => event.id)
		.unique(),
	attendanceInterest: attendanceInterest('attendance_interest')
		.notNull()
		.default('skipping'),
	preferedFaction: text('prefered_faction'),
	assignedFaction: text('assigned_faction')
})

export const user_metadata = pgTable('user_metadata', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade'
		}),
	metadata: jsonb('metadata').default('{}')
})
