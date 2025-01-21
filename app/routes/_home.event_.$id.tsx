import { useNavigate } from 'react-router'
import type { Route } from './+types/_home.event_.$id'
import { event as CalendarEvent } from '~/schema'
import { drizzleClient } from '~/lib/db.server'
import { eq } from 'drizzle-orm'

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

	return (
		<div>
			<button onClick={() => navigate(-1)}>vissza</button>

			<h2>{title}</h2>

			<img
				src={`/upload/content/${attachment}`}
				alt='Event Image'
				width={'50%'}
			/>
			<div>
				<p>{description}</p>
				<p>{createdBy}</p>
			</div>
		</div>
	)
}

export default EventPage
