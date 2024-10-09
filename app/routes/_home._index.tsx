import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createSupabaseServerClient } from '~/lib/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return { events: [] }
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
					<li>hello</li>
				))}
			</ul>
		</div>
	)
}

///<li key={event?.id ?? ''}>{event?.title ?? ''}</li>
