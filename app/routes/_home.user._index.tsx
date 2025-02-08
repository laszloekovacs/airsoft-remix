import { Link, redirect } from 'react-router'
import UserCreatedEventsTable from '~/components/user-created-events-table'
import type { Route } from './+types/_home.user._index'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import { event as CalendarEvent } from '~/schema'
import { eq } from 'drizzle-orm'

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
			<h2 className='mb-2 font-bold'>Általad meghírdetett játékok</h2>
			<UserCreatedEventsTable events={events} />
			<div className='flex justify-center my-2'>
				<Link to='/event/edit'>új játék létrehozása</Link>
			</div>
		</div>
	)
}

const ProfileNavbar = () => {
	return (
		<nav>
			<Link to='/user'>főoldalad</Link>
			<Link to='/user/events'>hirdetéseid</Link>
			<Link to='/user/applications'>jelentkezéseid</Link>
		</nav>
	)
}
