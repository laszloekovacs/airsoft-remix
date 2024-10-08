import { useLoaderData } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'
import { Database } from '~/supabase'

export const loader = async () => {
	const supabase = createClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!
	)

	const { data: events, error } = await supabase.from('events').select('*')

	if (error) {
		throw new Error(error.message)
	}

	return {
		events
	}
}

export default function Events() {
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
			<h1>Events</h1>
			<ul>
				{events.map(event => (
					<li key={event.id}>{event.title}</li>
				))}
			</ul>
		</div>
	)
}
