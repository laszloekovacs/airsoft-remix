import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { EditEventForm } from './EditEventForm'

describe('EditEventForm', () => {
	const initialValues = {
		title: '',
		url: 'generated-url',
		description: '',
		startDate: new Date()
	}

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

	it('shows generated-url', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		expect(screen.getByText('generated-url')).toBeInTheDocument()
	})

	it('shows an input with the name of description', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		const descriptionInput = screen.getByLabelText('Esemény leírása')

		expect(descriptionInput).toBeInTheDocument()
	})

	it('shows an input for start date', () => {
		render(<EditEventForm inititalValues={initialValues} />)
		const dateInput = screen
			.getByTestId('form')
			.querySelector('input[name="startDate"]')

		expect(dateInput).toBeInTheDocument()
	})
})
