import { eq } from 'drizzle-orm'
import { event } from '~/schema'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.event.($eventUrl).edit'

export const loader = async ({ params, request }: Route.ActionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) {
		throw new Response('Unauthorized', { status: 401 })
	}

	// it's a new event.
	if (!params.eventUrl) {
		return { data: null }
	}

	// load inital event data.
	const data = await drizzleClient
		.select()
		.from(event)
		.where(eq(event.url, params.eventUrl))

	if (!data || data.length === 0) {
		throw new Response('Event not found', { status: 404 })
	}

	// check if user id is the sames as event creator
	if (data[0].createdBy !== session.user.id) {
		throw new Response('Forbidden, ez nem a te eseményed!', { status: 403 })
	}

	return { data: data[0] }
}

export default function EventEditPage({ loaderData }: Route.ComponentProps) {
	const { data } = loaderData

	return (
		<div>
			<pre>{JSON.stringify(data, null, 1)}</pre>
		</div>
	)
}
