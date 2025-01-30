import React from 'react'
import LogoutButton from '~/components/logout-button'
import type { Route } from './+types/_home.profile'
import { auth } from '~/services/auth.server'
import { redirect } from 'react-router'
import { user } from '~/schema/auth-schema'
import { drizzleClient } from '~/services/db.server'
import { eq } from 'drizzle-orm'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) return redirect('/login')

	const userData = await drizzleClient
		.select()
		.from(user)
		.where(eq(user.id, session.user.id))

	if (userData.length == 0) {
		throw new Response('User not found', { status: 404 })
	}

	return { name: session.user.name }
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
	const { name } = loaderData

	return (
		<section>
			<LogoutButton />

			<div>
				<h1>{'the juicer'}</h1>
				<h2>{name}</h2>
			</div>
		</section>
	)
}
