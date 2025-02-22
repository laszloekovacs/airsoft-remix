import { useState } from 'react'
import {
	Group,
	GroupItem,
	GroupsContainer,
	useGroups
} from '~/components/Groups/PlayerAssignmentForm'

export default function Status() {
	const players = [
		{
			id: '1',
			name: 'Adam',
			callsign: 'Adam',
			avatar: 'https://picsum.photos/50',
			group: 'blue'
		},
		{
			id: '2',
			name: 'Bravo',
			callsign: 'Bravo',
			avatar: 'https://picsum.photos/50',
			group: 'red'
		},
		{
			id: '3',
			name: 'charlie',
			callsign: 'Charlie',
			avatar: 'https://picsum.photos/50',
			group: 'blue'
		},
		{
			id: '4',
			name: 'delta',
			callsign: 'Delta',
			avatar: 'https://picsum.photos/50',
			group: ''
		}
	]

	return <PlayerAssigmentForm players={players} />
}

const PlayerAssigmentForm = ({ players }) => {
	return (
		<GroupsContainer items={players}>
			<h3>All players</h3>
			<PlayerGroups />
		</GroupsContainer>
	)
}

const PlayerGroups = () => {
	const { groups } = useGroups()

	return (
		<ul>
			{groups.map(group => (
				<Group key={group} groupId={group}>
					<h3>{group}</h3>
					<PlayerList groupId={group} />
				</Group>
			))}
		</ul>
	)
}

const PlayerList = ({ groupId }) => {
	const { items } = useGroups()

	return (
		<div>
			<p>Players in this group</p>
			<ul>
				{items
					.filter(item => item.group == groupId)
					.map(item => (
						<GroupItem key={item.id} itemId={item.id}>
							<PlayerCard key={item.id} player={item} />
						</GroupItem>
					))}
			</ul>
		</div>
	)
}

const PlayerCard = ({ player }) => {
	return (
		<div>
			<img src={player.avatar} />
			<p>{player.callsign}</p>
		</div>
	)
}
