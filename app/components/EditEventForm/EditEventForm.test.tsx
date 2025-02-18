import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

describe('EditEventForm', () => {
	beforeEach(() => {
		cleanup()
	})

	it('should render a form', () => {
		render(<form data-testid='form'>test</form>)
		expect(screen.getByTestId('form')).toBeInTheDocument()
	})
})
