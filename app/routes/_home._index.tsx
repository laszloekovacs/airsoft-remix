import { EventList } from '~/components/EventList/EventList'
import { queryEventList } from '~/queries/queryEventList.server'
import type { Route } from './+types/_home._index'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const eventList = await queryEventList()

	return { eventList }
}
export default function HomeIndex({ loaderData }: Route.ComponentProps) {
	const { eventList } = loaderData
	return (
		<div>
			<h2>Játékok</h2>
			<EventList events={eventList} />
		</div>
	)
}
