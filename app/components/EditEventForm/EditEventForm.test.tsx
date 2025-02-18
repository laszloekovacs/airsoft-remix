import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { EditEventForm } from './EditEventForm'

describe('EditEventForm', () => {
	beforeEach(() => {
		cleanup()
	})

	it('should render a form', () => {
		render(<EditEventForm />)
		expect(screen.getByTestId('form')).toBeInTheDocument()
	})
})
