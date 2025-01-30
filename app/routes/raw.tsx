import React from 'react'
import type { Route } from './+types/raw'
import { auth } from '~/services/auth.server'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	// redirect to login page if no session
	if (!session) return redirect('/login')

	return { session }
}

export default function RawDataPage({ loaderData }: Route.ComponentProps) {
	const { session } = loaderData

	return (
		<div>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	)
}
