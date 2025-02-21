import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { EventList } from './EventList'

describe('EventList', () => {
	it('renders a ul list', () => {
		render(<EventList events={[]} />)

		expect(screen.getByTestId('event-list')).toBeInTheDocument()
	})
})
