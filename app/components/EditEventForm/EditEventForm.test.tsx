import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { EditEventForm } from './EditEventForm'

describe('EditEventForm', () => {
	const initialValues = { title: '', url: 'generated-url', description: '' }

	beforeEach(() => {
		cleanup()
	})

	it('should render a form', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		expect(screen.getByTestId('form')).toBeInTheDocument()
	})

	it('should render input for event name', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		const form = screen.getByTestId('form')
		const nameInput = form.querySelector('input[name="name"]')

		expect(nameInput).toBeInTheDocument()
	})

	it('displays generated-url', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		expect(screen.getByText('generated-url')).toBeInTheDocument()
	})

	it('displays an input with the name of description', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		const descriptionInput = screen.getByLabelText('Esemény leírása')

		expect(descriptionInput).toBeInTheDocument()
	})
})
