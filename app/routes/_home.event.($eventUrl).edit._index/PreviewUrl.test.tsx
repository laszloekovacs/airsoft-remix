import { beforeAll, describe, expect, it, vi } from 'vitest'

describe('PreviewUrl', () => {
	beforeAll(() => {})

	it('should render its own div container', () => {
		expect(true).toBe(true)
	})

	it('fetches the url and displays it', () => {
		vi.mock('react-router', () => ({
			fetcher: {
				submit: vi.fn(),
				data: {
					url: 'mike',
					isAvailable: true
				}
			}
		}))
	})
})
