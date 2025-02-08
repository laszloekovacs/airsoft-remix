import { Link, redirect } from 'react-router'
import UserCreatedEventsTable from '~/components/user-created-events-table'
import type { Route } from './+types/_home.user._index'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import { event as CalendarEvent } from '~/schema'
import { eq } from 'drizzle-orm'
import ContactList from '~/components/contact-list'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session || !session?.user) return redirect('/login')

	const events = await drizzleClient
		.select()
		.from(CalendarEvent)
		.where(eq(CalendarEvent.createdBy, session.user.id))

	return { events }
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { events } = loaderData

	return (
		<div>
			<ContactList contacts={[]} />

			<UserCreatedEventsTable events={events} />
		</div>
	)
}
