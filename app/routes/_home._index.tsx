import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'
import { Database, Tables } from '~/supabase'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response()

	const supabase = createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get('Cookie') ?? '')
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						response.headers.append(
							'Set-Cookie',
							serializeCookieHeader(name, value, options)
						)
					})
				}
			}
		}
	)

	// query the events
	const { data: events, error } = await supabase
		.from('events')
		.select('*')
		.limit(10)

	return { events }
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
			<Link prefetch='intent' to={`/${event.id}`}>
				{event.title}
			</Link>
		</li>
	)
}
