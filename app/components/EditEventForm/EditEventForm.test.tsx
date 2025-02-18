import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('EditEventForm', () => {
	it('should render a form', () => {
		render(<p>test</p>)
		expect(screen.getByRole('form')).toBeInTheDocument()
	})
})
