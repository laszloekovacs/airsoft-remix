import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import UserEventTable from './UserEventTable'

describe('UsersEventTable', () => {
	beforeEach(() => {
		cleanup()
	})

	it('should render a table', () => {
		render(<UserEventTable eventSummaryList={[]} />)
		expect(screen.getByRole('table')).toBeInTheDocument()
	})
})
