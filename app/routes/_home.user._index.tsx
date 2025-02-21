import { eq } from 'drizzle-orm'
import ContactList from '~/components/contact-list'
import UserCreatedEventsTable from '~/components/user-created-events-table'
import { event as CalendarEvent } from '~/schema'
import { getSession } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.user._index'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request)

	if (!session || !session?.user)
		return new Response('Unauthorized', { status: 401 })

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
