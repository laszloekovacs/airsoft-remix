import { eq } from 'drizzle-orm'
import type { UserEventTableRow } from '~/components/UsersEventTable/UserEventTable'
import { event } from '~/schema'
import { db } from '~/services/db.server'

export const queryUserEventList = async (userId: string) => {
	const databaseEvents = await db
		.select()
		.from(event)
		.where(eq(event.createdBy, userId))

	const eventViewModel: UserEventTableRow[] = databaseEvents.map(e => ({
		id: e.id,
		title: e.title,
		url: e.url,
		startDate: e.startDate
	}))

	return eventViewModel
}
