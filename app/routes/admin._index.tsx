import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect
} from '@remix-run/node'
import { Form } from '@remix-run/react'
import { genPostgresUUID } from '~/services/drizzle.server'
import { getSession } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))

	// check for admin claim
	if (!session.data.user?.claims.includes('admin')) {
		return new Response('Forbidden', {
			status: 403,
			statusText: 'Forbidden'
		})
	} else {
		return new Response('ok', { status: 200 })
	}
}

export default function AdminPage() {
	return (
		<div>
			<h2>AdminPage</h2>
			<Form method='post'>
				<button type='submit'>Create Event</button>
			</Form>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	// TODO:check for admin claims

	const id = await genPostgresUUID()
	return redirect(`/admin/events/${id}/edit`)
}
