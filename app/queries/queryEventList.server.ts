// returns list of events for the index page to list out

import { db } from '~/services/db.server'
import { event } from '~/schema'
import type { EventListItem } from '~/components/EventList/EventList'

export const queryEventList = async () => {
	const eventList = await db.select().from(event)

	const eventViewModel: EventListItem[] = eventList.map(e => ({
		id: e.id,
		title: e.title,
		url: e.url,
		createdBy: e.createdBy || 'anon',
		startDate: e.startDate,
		coverPhoto: e.coverPhoto || 'https://picsum.photos/820/312'
	}))
	return eventViewModel
}
