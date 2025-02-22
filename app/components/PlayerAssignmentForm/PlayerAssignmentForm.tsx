import { useState } from 'react'

type PlayerAssignment = {
	id: string
	name: string
	callsign: string
	avatar: string
	faction: string
}

type PlayerAssignmentFormProps = {
	players: PlayerAssignment[]
}

export default function PlayerAssignmentForm(props: PlayerAssignmentFormProps) {
	const [playerList, setPlayerList] = useState(props.players)

	const factions = Object.groupBy(playerList, p => p.faction)

	return (
		<div data-testid='player-assignment-form'>
			<pre>{JSON.stringify(factions, null, 2)}</pre>
		</div>
	)
}
