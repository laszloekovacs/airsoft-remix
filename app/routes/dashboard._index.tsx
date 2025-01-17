import { Link } from 'react-router'
import invariant from 'tiny-invariant'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { group, groupUser } from '~/schema'
import type { Route } from './+types/dashboard._index'
import { eq } from 'drizzle-orm'

type groupSelectType = typeof group.$inferSelect

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	invariant(session, 'no session data')

	//TODO return the list of groups this user is part of
	const groupList = await db
		.select()
		.from(group)
		.where(eq(groupUser.userId, session.user.id))

	return { groupList }
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { groupList } = loaderData

	return (
		<div>
			<h2>Szervező oldal</h2>

			<div>
				<h2>Csoportjaim</h2>
				<br />
				<Link to='dashboard/group/create'>új csoport létrehozása</Link>
				<GroupsList groups={groupList} />
			</div>
		</div>
	)
}

//<GroupsList groups={groups} />
const GroupsList = ({ groups }: { groups: groupSelectType[] }) => {
	return (
		<ul>
			{groups.map(group => (
				<li key={group.id}>
					<Link to={`/dashboard/group/${group.urlPath}`}>{group.name}</Link>
				</li>
			))}
		</ul>
	)
}
