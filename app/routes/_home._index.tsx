import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Await, defer, useAsyncValue, useLoaderData } from '@remix-run/react'
import { db } from '~/services/drizzle.server'
import { events, users } from '~/schema/schema.server'
import { asc, eq } from 'drizzle-orm'
import { Suspense } from 'react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' }
	]
}

type EventListItem = {
	id: string
	title: string
	text_mdx: string
	created_at: Date
	creator_name: string
	creator_id: string
	start_time: Date
}

export default function Index() {
	const { eventsPromise } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>Index</h1>

			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={eventsPromise}>
					<EventsTable />
				</Await>
			</Suspense>
		</div>
	)
}

const EventsTable = () => {
	const eventList = useAsyncValue() as Awaited<EventListItem[]>

	return (
		<div>
			<h2>Events</h2>
			<ul>
				{eventList.map(event => (
					<EventsTableItem key={event.id} event={event} />
				))}
			</ul>
		</div>
	)
}

const EventsTableItem = ({ event }: { event: EventListItem }) => (
	<li>
		<time>{event.start_time.toString()}</time>
		<p>{event.creator_name}</p>
		<a href={`/events/${event.id}`}>{event.title}</a>
	</li>
)

export const loader = async ({ request }: LoaderFunctionArgs) => {
	// start streaming the events table.
	const eventsPromise: Promise<EventListItem[]> = db
		.select({
			id: events.id,
			title: events.title,
			text_mdx: events.text_mdx,
			created_at: events.created_at,
			creator_name: users.name,
			creator_id: events.creator_id,
			start_time: events.start_time
		})
		.from(events)
		.orderBy(asc(events.created_at))
		.leftJoin(users, eq(users.id, events.creator_id))
		.then()

	// TODO: investigate why nakedly passing the events_stream to defer is not working
	// and needs to be closed with .then()
	return defer({ eventsPromise })
}
