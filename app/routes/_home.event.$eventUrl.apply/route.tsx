import type { Route } from '.react-router/types/app/routes/_home.event.$eventUrl.apply/+types/route'
import type { User } from 'better-auth'
import { eq } from 'drizzle-orm'
import { Form } from 'react-router'
import { event } from '~/schema'
import { getSessionCookie, isSessionCookie } from '~/services/auth.server'
import { db } from '~/services/db.server'

type ApplyToEventViewModel = {
	id: string
	title: string
	startDate: string
	coverPhoto: string | null
	applicant: User
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = await getSessionCookie(request)

	if (!sessionCookie && !isSessionCookie(sessionCookie)) {
		throw new Error('Unauthorized')
	}

	if (sessionCookie?.user === undefined) {
		throw new Error('Unauthorized')
	}

	const result = await db
		.select()
		.from(event)
		.where(eq(event.url, params.eventUrl))

	if (!result || result.length === 0) {
		throw new Error('Event not found')
	}

	const applyToEventData: ApplyToEventViewModel = {
		id: result[0].id,
		title: result[0].title,
		startDate: result[0].startDate,
		coverPhoto: result[0].coverPhoto,
		applicant: sessionCookie.user
	}

	return applyToEventData
}

export default function ApplyToEventPage({ loaderData }: Route.ComponentProps) {
	const { title, applicant, startDate } = loaderData

	return (
		<div>
			<h2>Jelentkezés Eseményre</h2>
			<h2>{title}</h2>
			<p>{startDate}</p>
			<Form>
				<input type='submit' value='Submit' />
				<input type='reset' value='Reset' />
			</Form>
		</div>
	)
}
