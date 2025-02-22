import { Group } from '@radix-ui/themes/components/context-menu'
import {
	GroupItem,
	GroupsContainer
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

	return (
		<GroupsContainer items={players}>
			<Group groupId='blue'>
				<GroupItem itemId='1'>
					<p>mogadishu</p>
					<img src='https://picsum.photos/50' draggable='false' />
				</GroupItem>
			</Group>
		</GroupsContainer>
	)
}
