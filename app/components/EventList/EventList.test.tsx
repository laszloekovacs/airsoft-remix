import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { EventListItem } from './EventList'
import { EventList } from './EventList'

describe('EventList', () => {
	let data: EventListItem
	let Stub: ReturnType<typeof createRoutesStub>

	afterEach(() => {
		cleanup()
	})

	beforeEach(() => {
		data = {
			id: '1',
			title: 'event title',
			url: 'testeventurl',
			createdBy: 'testuser',
			startDate: '2002-10-02',
			coverPhoto: 'photourl'
		}

		Stub = createRoutesStub([
			{
				path: '/',
				Component: () => (
					<div>
						<EventList events={[data]} />
					</div>
				)
			}
		])
	})

	it('renders a ul list', () => {
		render(<EventList events={[]} />)

		expect(screen.getByTestId('event-list')).toBeInTheDocument()
	})

	it('renders a list', () => {
		render(<Stub />)
		expect(screen.getByRole('listitem')).toBeInTheDocument()
	})

	it('renders the title, start date, creator username of the event', () => {
		render(<Stub />)
		expect(screen.getByText(data.startDate)).toBeInTheDocument()
		expect(screen.getByText(data.title)).toBeInTheDocument()
		expect(screen.getByText(data.createdBy)).toBeInTheDocument()
	})

	it('renders the cover photo', () => {
		render(<Stub />)
		const img = screen.getByRole('img')

		expect(img).toBeInTheDocument()
		expect(img).toHaveAttribute('src', data.coverPhoto)
	})

	it('renders a link to event details', async () => {
		render(<Stub />)

		expect(screen.getByRole('link')).toBeInTheDocument()
		expect(screen.getByRole('link')).toHaveAttribute(
			'href',
			'/event/testeventurl'
		)
	})
})
