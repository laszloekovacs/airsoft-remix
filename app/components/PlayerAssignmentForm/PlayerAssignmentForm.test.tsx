import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PlayerAssignmentForm from './PlayerAssignmentForm'

describe('PlayerAssignmentForm', () => {
	it('should render', () => {
		render(<PlayerAssignmentForm initialValues={{}} />)
		expect(screen.getByTestId('player-assignment-form')).toBeInTheDocument()
	})
})
