import { Link, redirect } from 'react-router'
import { auth } from '~/services/auth.server'
import { group } from '~/schema'
import type { Route } from './+types/dashboard._index'
import { drizzleClient } from '~/services/db.server'
import { eq } from 'drizzle-orm'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) return redirect('/login')

	//TODO return the list of groups this user is owner of
	const myGroups = await drizzleClient
		.select()
		.from(group)
		.where(eq(group.createdBy, session.user.id))

	return { myGroups }
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { myGroups } = loaderData

	return (
		<div>
			<h2>Csoportjaim</h2>
			<br />
			<Link to='group/create'>új csoport létrehozása</Link>
			{myGroups && <GroupsList groups={myGroups} />}
		</div>
	)
}

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
