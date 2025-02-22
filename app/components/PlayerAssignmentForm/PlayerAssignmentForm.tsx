import { useMemo, useState } from 'react'

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
	const { players: playerList } = props
	const { eventId } = props

	const factions = useMemo(
		() => Object.groupBy(playerList, p => p.faction),
		[playerList]
	)

	return (
		<div id={eventId}>
			<ul>
				{Object.keys(factions).map(faction => {
					return (
						<Faction
							key={faction}
							faction={faction}
							players={factions[faction]}
						/>
					)
				})}
			</ul>
		</div>
	)
}

const Faction = (props: { faction: string; players?: PlayerInfo[] }) => {
	const { faction, players } = props

	if (!players)
		return (
			<li id={faction}>
				<h3>{faction}</h3>
				<p>No players assigned</p>
			</li>
		)

	return (
		<li id={faction}>
			<h3>{faction}</h3>
			<ul>
				{players?.map(player => (
					<PlayerCard key={player.id} {...player} />
				))}
			</ul>
		</li>
	)
}

const PlayerCard = ({ ...props }: PlayerInfo) => {
	const { id, name, callsign, avatar } = props

	return (
		<li id={callsign}>
			<div>
				<h3>{callsign}</h3>
				<h2>{name}</h2>
				<img src={avatar ?? null} alt={name} />
			</div>
		</li>
	)
}
