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

export const user_metadata = pgTable('user_metadata', {
	id: uuid().primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade'
		}),
	metadata: jsonb('metadata').default('{}')
})
