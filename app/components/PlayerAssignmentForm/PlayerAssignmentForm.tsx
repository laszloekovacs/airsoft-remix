import { useState } from 'react'

type PlayerInfo = {
	id: string
	name: string
	callsign: string
	avatar: string
	faction: string
}

type PlayerAssignmentFormProps = {
	eventId: string
	players: PlayerInfo[]
}

export const PlayerAssignmentForm = (props: PlayerAssignmentFormProps) => {
	const [players, setPlayers] = useState(props.players)
	const { eventId } = props

	const handleDrop = (e: React.DragEvent, faction: string) => {
		const id = e.dataTransfer.getData('id')

		const player = players.find(p => p.id == id)
		if (player) {
			const newPlayers = players.filter(p => p.id != id)

			setPlayers([...newPlayers, { ...player, faction }])
		}
	}

	const playersWithNamedFaction = players.map(p => ({
		...p,
		faction: p.faction || 'várólista'
	}))
	const factions = Object.groupBy(playersWithNamedFaction, p => p.faction)

	return (
		<div id={eventId}>
			<ul>
				{Object.keys(factions).map(faction => {
					return (
						<Faction
							key={faction}
							faction={faction}
							players={factions[faction] ?? []}
							onDrop={handleDrop}
						/>
					)
				})}
			</ul>
		</div>
	)
}

type FactionProps = {
	faction: string
	players: PlayerInfo[]
	onDrop: (e: React.DragEvent, faction: string) => void
}

export const Faction: React.FC<FactionProps> = ({
	faction,
	players,
	onDrop
}) => {
	const EmptyList = () => <li>Nincs játékos</li>

	return (
		<li
			id={faction}
			onDragOver={e => e.preventDefault()}
			onDrop={e => onDrop(e, faction)}>
			<h3>{faction}</h3>
			<ul>
				{players.length == 0 ? (
					<EmptyList />
				) : (
					players.map(player => <Item key={player.id} {...player} />)
				)}
			</ul>
		</li>
	)
}

const Item: React.FC<PlayerInfo> = ({ id, name, callsign, avatar }) => {
	return (
		<li
			id={callsign}
			draggable
			onDragStart={e => e.dataTransfer.setData('id', id)}>
			<div>
				<h3>{callsign}</h3>
				<img src={avatar ?? null} alt={name} draggable={false} />
			</div>
		</li>
	)
}
