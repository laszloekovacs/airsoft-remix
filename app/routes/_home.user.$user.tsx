import React, { useReducer } from 'react'
import type { Route } from './+types/_home.user.$user'

export const loader = async ({ params }: Route.LoaderArgs) => {
	const username = params.user

	return { username }
}

const UserPage = ({ loaderData }: Route.ComponentProps) => {
	const { username } = loaderData
	return (
		<div>
			<div>Profil</div>
			<p>{username}</p>
		</div>
	)
}

export default UserPage
