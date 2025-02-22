import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PlayerAssignmentForm from './PlayerAssignmentForm'

describe('PlayerAssignmentForm', () => {
	const players = [
		{
			id: '1',
			name: 'John Doe',
			callsign: 'JD',
			avatar: 'https://picsum.photos/200/300',
			faction: 'the juicers'
		},
		{
			id: '2',
			name: 'Mike jeffs',
			callsign: 'Juice',
			avatar: 'https://picsum.photos/200/300',
			faction: 'the patriots'
		}
	]

	it('should render', () => {
		render(<PlayerAssignmentForm players={[]} />)
		expect(screen.getByTestId('player-assignment-form')).toBeInTheDocument()
	})

	it('should render a list of players', () => {
		render(<PlayerAssignmentForm players={players} />)
		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('Mike jeffs')).toBeInTheDocument()
		expect(screen.getByRole('listitem')).toBeInTheDocument()
		expect(screen.getByRole('list')).toBeInTheDocument()
	})
})
