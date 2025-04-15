import { eq } from 'drizzle-orm'
import { Outlet, useFetcher } from 'react-router'
import { EditableText } from '~/components/editable-text'
import LogoutButton from '~/components/logout-button'
import { user } from '~/schema/auth-schema'
import { getCookieFromRequest } from '~/services/auth.server'
import { db } from '~/services/db.server'
import { type Route } from './+types/route'
import { updateCallsign } from '~/queries/updateCallsign.server'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const sessionCookie = await getCookieFromRequest(request)

	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	const userData = await db
		.select()
		.from(user)
		.where(eq(user.id, sessionCookie.user.id))

	if (userData.length == 0) {
		throw new Response('User not found', { status: 404 })
	}

	return {
		name: sessionCookie.user.name,
		callsign: '' // sessionCookie.user.metadata?.callsign ?? ''
	}
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
	const sessionCookie = await getCookieFromRequest(request)

	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	const formData = await request.formData()
	const intention = formData.get('intention')

	if (intention === 'SET_CALLSIGN') {
		const callsign = formData.get('callsign') as string
		if (!callsign) throw new Response('Badly formatted data', { status: 400 })

		const result = await updateCallsign(sessionCookie.user.id, callsign)

		if (result.length == 0) {
			throw new Response('Failed to update callsign', { status: 500 })
		}

		return null
	}

	return null
}
