import { Link } from 'react-router'
import type { event as CalendarEvent } from '~/schema'
import CoverPhoto from './cover-photo'

export const EventCalendarContainer = ({
	events
}: {
	events: (typeof CalendarEvent.$inferSelect)[]
}) => {
	if (events.length === 0) {
		return <p>Nincs megjeleníthető esemény</p>
	}
	return <EventsList events={events} />
}

const EventsList = ({
	events
}: {
	events: (typeof CalendarEvent.$inferSelect)[]
}) => {
	return (
		<ul>
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
		<li>
			<Link to={`/event/${event.url}`}>
				<div>
					<div>
						<p>{event.startDate}</p>
					</div>
					<h2>{event.title}</h2>
					<CoverPhoto />
				</div>
				<div>{event.createdBy} által megosztva</div>
			</Link>
		</li>
	)
}
