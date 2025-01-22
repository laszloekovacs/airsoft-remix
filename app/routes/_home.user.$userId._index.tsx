import { drizzleClient } from '~/lib/db.server'
import { user } from '~/schema/auth-schema'
import type { Route } from './+types/_home.user.$userId._index'
import { eq } from 'drizzle-orm'
import { auth } from '~/lib/auth.server'

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	// user is logged in and the user id is the same as the requested user id
	// or the params.userId is "me"
	let requestedUserId = params.userId
	let requestedUserIsMe = false

	if (
		session &&
		(params.userId === 'me' || session.user.id === params.userId)
	) {
		requestedUserIsMe = true
		requestedUserId = session.user.id
	}

	// find the user id in the database
	const userData = await drizzleClient
		.select()
		.from(user)
		.where(eq(user.id, requestedUserId))

	if (userData.length == 0) {
		throw new Response('User not found', { status: 404 })
	}

	return { user: userData[0], requestedUserIsMe }
}

const UserProfilePage = ({ loaderData }: Route.ComponentProps) => {
	const { user, requestedUserIsMe } = loaderData
	return (
		<div>
			<h1>{user.name}</h1>
			{user.image && <img src={user?.image} alt={user.name} width='50px' />}
			{requestedUserIsMe && <p>Ez a te profilod</p>}
		</div>
	)
}

export default UserProfilePage
