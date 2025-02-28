import { describe, expect, it, vi } from 'vitest'

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

describe('loader', async () => {
	it('thows if user isnt logged in', async () => {
		// mock imported function getSessionCookie
		vi.mock('./')

		const request = new Request('https://example.com', {
			method: 'GET',
			headers: { Cookie: '' }
		})

		const result = async () =>
			loader({ params: {} as any, request, context: {} as any })

		await expect(result).rejects.toThrow('Unauthorized')
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
