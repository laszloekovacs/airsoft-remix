import { PlayerAssignmentForm } from '~/components/PlayerAssignmentForm/PlayerAssignmentForm'

export default function Status() {
	const players = [
		{
			id: '1',
			name: 'Adam',
			callsign: 'Adam',
			avatar: 'https://picsum.photos/50',
			faction: 'blue'
		},
		{
			id: '2',
			name: 'Bravo',
			callsign: 'Bravo',
			avatar: 'https://picsum.photos/50',
			faction: 'red'
		},
		{
			id: '3',
			name: 'charlie',
			callsign: 'Charlie',
			avatar: 'https://picsum.photos/50',
			faction: 'blue'
		}
	]

	return <PlayerAssignmentForm players={players} />
}
