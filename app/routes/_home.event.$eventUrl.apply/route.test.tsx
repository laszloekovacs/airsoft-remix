import { describe, expect, it } from 'vitest'

describe('Event page', () => {
	it.todo('renders the events name, and date, splash image', () => {
		expect(true).toBe(true)
	})

	it.todo('renders a selection with the available factions', () => {
		expect(true).toBe(true)
	})

	it.todo('renders the number of applicants', () => {
		expect(true).toBe(true)
	})

	it.todo('renders an input for the user to leave a comment / question', () => {
		expect(true).toBe(true)
	})

	it.todo(
		'indicates if the user has a phone number or email he can be reached',
		() => {
			expect(true).toBe(true)
		}
	)

	it.todo('renders a cancel button and a submit button', () => {
		expect(true).toBe(true)
	})
})

import { loader } from './route'

describe('loader', () => {
	it('checks for user to be logged in', () => {
		const request = new Request('', {})

		const result = () =>
			loader({ params: {} as any, request, context: {} as any })

		expect(result).rejects.toThrow()
	})

	it.todo('checks if the event exists', () => {
		expect(true).toBe(true)
	})

	it.todo('returns the number of all applicants', () => {
		expect(true).toBe(true)
	})

	it.todo('returns the number of applicants per faction', () => {
		expect(true).toBe(true)
	})
})

describe('actions', () => {
	it.todo('check if user is logged in', () => {
		expect(true).toBe(true)
	})

	it.todo('check if event exists', () => {
		expect(true).toBe(true)
	})

	it.todo('creates an application row', () => {
		expect(true).toBe(true)
	})
})
