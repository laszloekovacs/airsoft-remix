import type { Route } from './+types/_home._index'
import { drizzleClient } from '~/services/db.server'
import { event as CalendarEvent } from '~/schema'
import { EventList, type EventListItem } from '~/components/EventList/EventList'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const eventList = await drizzleClient.select().from(CalendarEvent).limit(10)

	const events: EventListItem[] = eventList.map(e => ({
		id: e.id,
		title: e.title,
		url: e.url,
		createdBy: e.createdBy || 'anon',
		startDate: e.startDate,
		coverPhoto: e.coverPhoto || 'https://picsum.photos/820/312'
	}))

	return { events }
}
export default function HomeIndex({ loaderData }: Route.ComponentProps) {
	const { events } = loaderData

	return (
		<div>
			<h2>Játékok</h2>
			<EventList events={events} />
		</div>
	)
}
