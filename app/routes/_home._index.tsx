import { EventCalendarContainer } from '~/components/event-list'
import type { Route } from './+types/_home._index'
import { drizzleClient } from '~/services/db.server'
import { event as CalendarEvent } from '~/schema'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const events = await drizzleClient.select().from(CalendarEvent).limit(10)

	return { events }
}

const HomeIndex = ({ loaderData }: Route.ComponentProps) => {
	return (
		<div>
			<EventCalendarContainer events={loaderData.events} />
		</div>
	)
}

export default HomeIndex
