import type { Route } from '.react-router/types/app/routes/_home.event.$eventUrl.apply/+types/route'
import { getSessionCookie, isSessionCookie } from '~/services/auth.server'
import { db } from '~/services/db.server'
import { event } from '~/schema'
import { eq } from 'drizzle-orm'

type ApplyToEventViewModel = {
	id: string
	title: string
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = await getSessionCookie(request)

	if (!isSessionCookie(sessionCookie)) {
		throw new Error('Unauthorized')
	}

	const result = await db
		.select()
		.from(event)
		.where(eq(event.url, params.eventUrl))

	if (!result || result.length === 0) {
		throw new Error('Event not found')
	}

	const eventData: ApplyToEventViewModel = {
		id: result[0].id,
		title: result[0].title
	}

	return { eventData }
}
