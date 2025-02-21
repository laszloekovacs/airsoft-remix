import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { EventList } from './EventList'
import type { EventListItem } from './EventList'

describe('EventList', () => {
	const data: EventListItem = {
		id: 1,
		title: 'event title',
		url: 'testeventurl',
		createdBy: 'testuser',
		startDate: '2002-10-02',
		coverPhoto: 'photourl'
	}

	it('renders a ul list', () => {
		render(<EventList events={[]} />)

		expect(screen.getByTestId('event-list')).toBeInTheDocument()
	})

	it('renders a list', () => {
		render(<EventList events={[data]} />)
		expect(screen.getByRole('listitem')).toBeInTheDocument()
	})

	it('renders the title, start date, creator username of the event', () => {
		render(<EventList events={[data]} />)
		expect(screen.getByText(data.startDate)).toBeInTheDocument()
		expect(screen.getByText(data.title)).toBeInTheDocument()
		expect(screen.getByText(data.createdBy)).toBeInTheDocument()
	})

	it('renders the cover photo', () => {
		render(<EventList events={[data]} />)
		const img = screen.getByRole('img')

		expect(img).toBeInTheDocument()
		expect(img).toHaveAttribute('src', data.coverPhoto)
	})
})
