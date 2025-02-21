import { eq } from 'drizzle-orm'
import { Outlet, useFetcher } from 'react-router'
import { EditableText } from '~/components/editable-text'
import LogoutButton from '~/components/logout-button'
import { user } from '~/schema/auth-schema'
import { getSession } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.user'
import { updateCallsign } from '~/queries/updateCallsign.server'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request)

	if (!session) throw new Response('Unauthorized', { status: 401 })

	const userData = await drizzleClient
		.select()
		.from(user)
		.where(eq(user.id, session.user.id))

	if (userData.length == 0) {
		throw new Response('User not found', { status: 404 })
	}

	return { name: session.user.name, callsign: session.user.callsign }
}

export default function UserPage({ loaderData }: Route.ComponentProps) {
	const { name, callsign } = loaderData
	const fetcher = useFetcher()

	const handleCallsignChange = async (value: string) => {
		await fetcher.submit(
			{ intention: 'SET_CALLSIGN', callsign: value },
			{ method: 'post', encType: 'application/x-www-form-urlencoded' }
		)
	}

	return (
		<div>
			<div className='flex flex-row justify-end'>
				<LogoutButton />
			</div>

			<h3>
				<EditableText value={callsign} onSave={handleCallsignChange} />
			</h3>

			<p>{name}</p>

			<Outlet />
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const session = await getSession(request)

	if (!session) throw new Response('Unauthorized', { status: 401 })

	const formData = await request.formData()
	const intention = formData.get('intention')

	if (intention === 'SET_CALLSIGN') {
		const callsign = formData.get('callsign') as string
		if (!callsign) throw new Response('Badly formatted data', { status: 400 })

		const result = await updateCallsign(session.user.id, callsign)

		if (result.length == 0) {
			throw new Response('Failed to update callsign', { status: 500 })
		}

		return null
	}
}
