import { useNavigate } from 'react-router'
import type { Route } from './+types/_home.event_.$id'
import { event as CalendarEvent } from '~/schema'
import { drizzleClient } from '~/services/db.server'
import { eq } from 'drizzle-orm'
import Markdown from 'react-markdown'

// TODO: infer from db type
export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const eventData = await drizzleClient
		.select()
		.from(CalendarEvent)
		.where(eq(CalendarEvent.urlPath, params.id))

	return { eventData: eventData[0] }
}

const EventPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, description, attachment, createdBy } = loaderData.eventData
	const navigate = useNavigate()

	const text = 'hello markdown'

	return (
		<div>
			<button onClick={() => navigate(-1)}>vissza</button>

			<h1>{title}</h1>

			<img src={`/upload/content/${attachment}`} alt='Event Image' />
			<div>
				<Markdown>{text}</Markdown>
				<p>{createdBy}</p>
			</div>
		</div>
	)
}

export default EventPage
