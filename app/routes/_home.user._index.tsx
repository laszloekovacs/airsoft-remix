import { auth } from '~/lib/auth.server'
import type { Route } from './+types/_home.user._index'
import { Link } from 'react-router'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	return JSON.parse(JSON.stringify(session))
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { user } = loaderData

	return (
		<div>
			<h2>UserIndexPage</h2>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<GroupsContainer />
		</div>
	)
}

const GroupsContainer = () => {
	return (
		<div>
			<h2>Szervezeteim</h2>
			<Link to='/user/group/create'>létrehozás</Link>
			<GroupsList />
		</div>
	)
}

const GroupsList = () => {
	return (
		<ul>
			<li>group 1</li>
			<li>group 2</li>
			<li>group 3</li>
		</ul>
	)
}
