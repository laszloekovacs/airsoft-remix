import { EventCalendarContainer } from '~/components/event-list'
import type { Route } from './+types/_home._index'
import { drizzleClient } from '~/services/db.server'
import { event as CalendarEvent } from '~/schema'

export const loader = async ({ request }: Route.LoaderArgs) => {
	// extract 'page' search param
	const url = new URL(request.url)
	const page = url.searchParams.get('page')

	if (page) {
		const pageParam = parseInt(page)

		if (isNaN(pageParam) || pageParam < 1) {
			throw new Error('Invalid page parameter')
		}

		const offset = (pageParam - 1) * 10
		console.log(offset)

		const events = await drizzleClient
			.select()
			.from(CalendarEvent)
			.limit(10)
			.offset(offset)

		return { events }
	}

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
