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
import { getSessionCookie } from '~/services/auth.server'
import { isSessionCookie } from '~/services/auth.server'

describe('loader', async () => {
	it('thows if user isnt logged in', async () => {
		vi.mock('~/services/auth.server', () => {
			return {
				getSessionCookie: vi.fn(() => 0),
				isSessionCookie: vi.fn(() => 0)
			}
		})

		const request = new Request('https://example.com', {
			method: 'GET',
			headers: { Cookie: '' }
		})

		const result = await loader({
			params: {} as any,
			request,
			context: {} as any
		})

		expect(getSessionCookie).toHaveBeenCalledWith(request)
		expect(isSessionCookie).toHaveBeenCalledWith('hello')
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
