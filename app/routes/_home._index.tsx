import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createServerSupabase } from '~/lib/createServerSupabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase } = createServerSupabase(request)

	const { data: events, error } = await supabase.from('events').select('*')

	if (error) {
		throw new Error(error.message)
	}

	return {
		events
	}
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
					<li key={event.id}>{event.title}</li>
				))}
			</ul>
		</div>
	)
}
