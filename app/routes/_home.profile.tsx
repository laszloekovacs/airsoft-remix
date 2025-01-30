import { eq } from 'drizzle-orm'
import { redirect } from 'react-router'
import LogoutButton from '~/components/logout-button'
import { user } from '~/schema/auth-schema'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.profile'
import ContactList from '~/components/contact-list'
import UserCreatedEventsTable from '~/components/user-created-events-table'

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

	return { name: session.user.name }
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
	const { name } = loaderData

	return (
		<div>
			<LogoutButton />

			<section>
				<h1>{'the juicer'}</h1>
				<h2>{name}</h2>
			</section>

			<section>
				<h2>elérhetőségek</h2>
				<ContactList contacts={[]} />
			</section>

			<section>
				<UserCreatedEventsTable
					events={[
						{
							id: 1,
							title: 'event 1'
						},
						{
							id: 2,
							title: 'event 2'
						}
					]}
				/>
			</section>
		</div>
	)
}
