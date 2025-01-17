import { Link } from 'react-router'
import { auth } from '~/lib/auth.server'
import { group } from '~/schema'
import type { Route } from './+types/dashboard._index'

type groupSelectType = typeof group.$inferSelect

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) throw new Response(null, { status: 401 })

	//TODO return the list of groups this user is part of
	const groupList = null
	/*
	await db
		.select()
		.from(group)
		.innerJoin(groupUser, eq(group.id, groupUser.groupId))
		.where(eq(groupUser.userId, session.user.id))
*/
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
				<Link to='group/create'>új csoport létrehozása</Link>
				{groupList && <GroupsList groups={groupList} />}
			</div>
		</div>
	)
}

//<GroupsList groups={groups} />
const GroupsList = ({ groups }: { groups: (typeof group.$inferSelect)[] }) => {
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
