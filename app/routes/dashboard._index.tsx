import { auth } from '~/lib/auth.server'
import { Link } from 'react-router'
import invariant from 'tiny-invariant'
import { group } from '~/schema'
import { db } from '~/lib/db.server'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	invariant(session, 'no session data')

	// list of groups
	const groupList = await db.select().from(group)

	return {
		groupList
	}
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { groupList } = loaderData

	return (
		<div>
			<h2>Szervező oldal</h2>

			<div>
				<h2>Csoportjaim</h2>
				<Link to='/user/group/create'>létrehozás</Link>
				<GroupsList groups={groupList} />
			</div>
		</div>
	)
}

//<GroupsList groups={groups} />
const GroupsList = ({ groups }: { groups: any[] }) => {
	return (
		<ul>
			{groups.map(group => (
				<li key={group.id}>
					<Link to={`/user/group/${group.url}`}>{group.name}</Link>
				</li>
			))}
		</ul>
	)
}
