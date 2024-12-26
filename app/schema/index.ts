import { integer, pgTable, text } from 'drizzle-orm/pg-core'

export const testingTable = pgTable('testing_table', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text(),
	age: integer()
})
