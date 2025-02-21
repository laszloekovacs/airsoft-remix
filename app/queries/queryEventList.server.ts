// returns list of events for the index page to list out

import { drizzleClient } from '~/services/db.server'
import { event } from '~/schema'

export const queryEventList = async () => {
	const eventList = await drizzleClient.select().from(event)

	return eventList
}
