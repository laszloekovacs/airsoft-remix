import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { events } from '~/schema/schema.server'
import { db } from '~/services/drizzle.server'
import invariant from 'tiny-invariant'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.eventId, 'event id is required')

	const event = await db
		.select()
		.from(events)
		.where(eq(events.id, params.eventId))

	return { event }
}

export default function EventDetailPage() {
	const { event } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Event Detail Page</h2>
			<pre>{JSON.stringify(event, null, 2)}</pre>
		</div>
	)
}
