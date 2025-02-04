import { eq } from 'drizzle-orm'
import { event } from '~/schema'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.event.($eventUrl).edit'
import { Form, useFetcher } from 'react-router'
import styles from './_home.event.($eventId).edit.module.css'

export const loader = async ({ params, request }: Route.ActionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) {
		throw new Response('Unauthorized', { status: 401 })
	}

	// it's a new event.
	if (!params.eventUrl) {
		return { eventData: null }
	}

	// load inital event data.
	const eventData = await drizzleClient
		.select()
		.from(event)
		.where(eq(event.url, params.eventUrl))

	if (!eventData || eventData.length === 0) {
		throw new Response('Event not found', { status: 404 })
	}

	// check if user id is the sames as event creator
	if (eventData[0].createdBy !== session.user.id) {
		throw new Response('Forbidden, ez nem a te eseményed!', { status: 403 })
	}

	return { eventData: eventData[0] }
}

export default function EventEditPage({ loaderData }: Route.ComponentProps) {
	const { eventData } = loaderData
	const fetcher = useFetcher()

	return (
		<div>
			<fetcher.Form className={styles.formContainer} method='POST'>
				<div>
					<input type='hidden' name='id' value={eventData?.id ?? ''} />
					<output>{eventData?.url}</output>
				</div>
				<div>
					<label htmlFor='title'>Esemény Címe:</label>
					<input
						type='text'
						id='title'
						name='title'
						defaultValue={eventData?.title ?? ''}
					/>
				</div>

				<div>
					<label htmlFor='startDate'>Esemény Napja:</label>
					<input
						type='date'
						id='startDate'
						name='startDate'
						defaultValue={eventData?.startDate}
					/>
				</div>

				<div>
					<label htmlFor='isPublished'>Nyilvános?:</label>
					<input
						type='checkbox'
						id='isPublished'
						name='isPublished'
						defaultChecked={eventData?.isPublished ?? false}
					/>
				</div>

				<input type='submit' value='Mentés' />
			</fetcher.Form>

			<pre>{JSON.stringify(eventData, null, 1)}</pre>
		</div>
	)
}

export const action = async ({ request, params }: Route.ActionArgs) => {
	const formData = await request.formData()
	const updateData = Object.fromEntries(formData)

	console.log(updateData)

	return {}
}
