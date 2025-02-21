import { EventList, type EventListItem } from '~/components/EventList/EventList'
import { queryEventList } from '~/queries/queryEventList.server'
import type { Route } from './+types/_home._index'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const eventList = await queryEventList()

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
