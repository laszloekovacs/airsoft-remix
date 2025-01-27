import { Link } from 'react-router'
import CoverPhoto from './cover-photo'

type Group = {
	id: number
	name: string
	coverPhoto: string
}

export default function GroupList({ groups }: { groups: Group[] }) {
	if (groups.length === 0 || !groups) {
		return <p>Nincs megjeleníthető csoport</p>
	}
	const list = groups.map(group => (
		<GroupListItem key={group.id} group={group} />
	))

	return <ul>{list}</ul>
}

const GroupListItem = ({ group }: { group: Group }) => {
	return (
		<li>
			<Link to={`/groups/${group.id}`}>
				<p>{group.name}</p>
				<CoverPhoto src={group.coverPhoto} />
			</Link>
		</li>
	)
}
