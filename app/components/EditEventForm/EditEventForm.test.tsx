import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { EditEventForm } from './EditEventForm'

describe('EditEventForm', () => {
	const initialValues = { name: '', url: '' }

	beforeEach(() => {
		cleanup()
	})

	it('should render a form', () => {
		render(<EditEventForm intitalValues={initialValues} />)
		expect(screen.getByTestId('form')).toBeInTheDocument()
	})

	it('should render input for event name', () => {
		render(<EditEventForm intitalValues={initialValues} />)
		const form = screen.getByTestId('form')
		const nameInput = form.querySelector('input[name="name"]')

		expect(nameInput).toBeInTheDocument()
	})
})
