import { auth } from '~/lib/auth.server'
import type { Route } from './+types/_home.user._index'

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
		</div>
	)
}
