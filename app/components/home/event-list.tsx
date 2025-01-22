import { Link } from 'react-router'
import type { event as CalendarEvent } from '~/schema'

export const EventCalendarContainer = ({
	events
}: {
	events: (typeof CalendarEvent.$inferSelect)[]
}) => {
	return (
		<div>
			<h2>Események</h2>
			{events && events.length > 0 && <EventsList events={events} />}
		</div>
	)
}

const EventsList = ({
	events
}: {
	events: (typeof CalendarEvent.$inferSelect)[]
}) => {
	return (
		<ul className='flex flex-col space-y-4'>
			{events.map(event => (
				<EventsListItem key={event.id} event={event} />
			))}
		</ul>
	)
}

const EventsListItem = ({
	event
}: {
	event: typeof CalendarEvent.$inferSelect
}) => {
	return (
		<li className='border p-4'>
			<Link to={`/event/${event.urlPath}`}>
				<h2>{event.title}</h2>
				<img
					src={`/upload/content/${event.attachment}`}
					alt={event.attachment}
					width={'50%'}
				/>
			</Link>
		</li>
	)
}
