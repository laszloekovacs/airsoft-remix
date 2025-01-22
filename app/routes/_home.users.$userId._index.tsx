import { drizzleClient } from '~/lib/db.server'
import { user } from '~/schema/auth-schema'
import type { Route } from './+types/_home.users.$userId._index'
import { eq } from 'drizzle-orm'

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	// find the user id in the database
	const userData = await drizzleClient
		.select()
		.from(user)
		.where(eq(user.id, params.userId))

	if (userData.length == 0) {
		throw new Response('User not found', { status: 404 })
	}

	return { user: userData[0] }
}

const UserProfilePage = ({ loaderData }: Route.ComponentProps) => {
	const { user } = loaderData
	return (
		<div>
			<h1>Felhasználó</h1>

			<p>
				<strong>Név:</strong> {user.name}
				{user.image && <img src={user?.image} alt={user.name} />}
			</p>
		</div>
	)
}

export default UserProfilePage
