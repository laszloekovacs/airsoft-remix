import { useNavigate } from 'react-router'
import type { Route } from './+types/_home.event_.$id'
import { event as CalendarEvent } from '~/schema'
import { drizzleClient } from '~/services/db.server'
import { eq } from 'drizzle-orm'
import Markdown from 'react-markdown'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const eventData = await drizzleClient
		.select()
		.from(CalendarEvent)
		.where(eq(CalendarEvent.urlPath, params.id))

	// look up creator and organizer group
	//	const organizer = await drizzleClient.select().from

	return { eventData: eventData[0] }
}

const EventPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, description, attachment, createdBy } = loaderData.eventData
	const navigate = useNavigate()

	return (
		<div>
			<button onClick={() => navigate(-1)}>vissza</button>

			<h1>{title}</h1>

			<img src={`/upload/content/${attachment}`} alt='Event Image' />

			{description && <Markdown>{description}</Markdown>}
			<p>{createdBy}</p>
		</div>
	)
}

export default EventPage
