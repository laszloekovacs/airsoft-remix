import { eq } from 'drizzle-orm'
import { Outlet, redirect, useFetcher } from 'react-router'
import ContactList from '~/components/contact-list'
import LogoutButton from '~/components/logout-button'
import { user } from '~/schema/auth-schema'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.user'
import DeleteAccountButton from '~/components/delete-account-button'
import { EditableText } from '~/components/editable-text'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) return redirect('/login')

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
			<div className='flex justify-end mb-4'>
				<LogoutButton />
			</div>

			<div className='mb-8'>
				<h1 className='text-2xl font-bold mb-2'>
					<EditableText value={callsign} onSave={handleCallsignChange} />
				</h1>
				<h2 className='mb-2'>{name}</h2>
			</div>

			<div className='mb-8'>
				<h2 className='font-bold mb-2'>Elérhetőségek:</h2>
				<ContactList contacts={[]} />
			</div>

			<Outlet />
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) throw new Response('Unauthorized', { status: 401 })

	const formData = await request.formData()
	const intention = formData.get('intention')

	if (intention === 'SET_CALLSIGN') {
		const callsign = formData.get('callsign') as string
		if (!callsign) {
			throw new Response('Badly formatted data', { status: 400 })
		} else {
			await drizzleClient
				.update(user)
				.set({ callsign: callsign })
				.where(eq(user.id, session.user.id))
		}

		return {}
	}
}
