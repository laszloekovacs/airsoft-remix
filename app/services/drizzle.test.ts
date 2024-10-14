import { expect, test } from 'vitest'
import { genPostgresUUID } from './drizzle.server'

// test uuid generator

test('genPostgresUUID', async () => {
	const uuid = await genPostgresUUID()

	// should not throw any error
	expect(uuid).toBeTruthy()

	// returns a string
	expect(typeof uuid).toBe('string')
})
