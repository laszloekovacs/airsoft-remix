import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { createServerSupabaseClient } from '~/lib/supabase.server'
import { Tables } from '~/supabase'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)

	// query the events
	const { data: events, error } = await supabase
		.from('events')
		.select('*')
		.limit(10)

	return json({ events }, { headers })
}

export default function Page() {
	const { events } = useLoaderData<typeof loader>()
	if (!events || events.length == 0) {
		return (
			<div>
				<h1>No Events</h1>
			</div>
		)
	}

	return (
		<div>
			<h1>Közelgő események</h1>
			<ul>
				{events.map(event => (
					<EventListItem key={event.id} event={event} />
				))}
			</ul>
		</div>
	)
}

export const EventListItem = ({ event }: { event: Tables<'events'> }) => {
	return (
		<li>
			<Link prefetch='intent' to={`/event/${event.id}`}>
				<h2>{event.title}</h2>
			</Link>
		</li>
	)
}
