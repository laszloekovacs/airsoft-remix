import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import UserEventTable from './UserEventTable'
import { createRoutesStub } from 'react-router'

describe('UsersEventTable', () => {
	afterEach(() => {
		cleanup()
	})

	beforeEach(() => {
		const Stub = createRoutesStub([
			{
				path: '/',
				Component: () => <UserEventTable eventSummaryList={[]} />
			}
		])

		render(<Stub />)
	})

	it('renders a table', () => {
		expect(screen.getByRole('table')).toBeInTheDocument()
	})
})
