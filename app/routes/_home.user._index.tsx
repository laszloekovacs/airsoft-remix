import { auth } from '~/lib/auth.server'
import type { Route } from './+types/_home.user._index'
import { Link } from 'react-router'
import invariant from 'tiny-invariant'
import { group } from '~/schema'
import { db } from '~/lib/db.server'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	invariant(session, 'no session data')
	const { user } = session

	// list of groups
	const groups = await db.select().from(group)
	console.log('groups', groups)

	return {
		user,
		groups
	}
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { user, groups } = loaderData

	return (
		<div>
			<h2>UserIndexPage</h2>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<div>
				<h2>Csoportjaim</h2>
				<Link to='/user/group/create'>létrehozás</Link>
				<GroupsList groups={groups} />
			</div>
		</div>
	)
}

//<GroupsList groups={groups} />
const GroupsList = ({ groups }: any[]) => {
	return (
		<ul>
			{groups.map(group => (
				<li key={group.id}>
					<Link to={`/user/group/${group.id}`}>{group.name}</Link>
				</li>
			))}
		</ul>
	)
}
