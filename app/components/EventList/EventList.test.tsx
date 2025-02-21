import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { EventList } from './EventList'

describe('EventList', () => {
	it('renders a ul list', () => {
		render(<EventList events={[]} />)

		expect(screen.getByTestId('event-list')).toBeInTheDocument()
	})

	it('renders a list item with the title "event title" ', () => {
		const data = {
			id: 1,
			title: 'event title',
			url: 'event',
			createdBy: 'event',
			startDate: 'event',
			coverPhoto: 'event'
		}

		render(<EventList events={[data]} />)
		expect(screen.getByText('event title')).toBeInTheDocument()
	})
})
