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
	/*
	const events = [
		{
			id: 1,
			name: 'Event 1',
			date: '2021-09-01',
			img: 'https://picsum.photos/200'
		},
		{
			id: 2,
			name: 'Event 2',
			date: '2021-09-02',
			img: 'https://picsum.photos/200'
		},
		{
			id: 3,
			name: 'Event 2',
			date: '2021-09-02',
			img: 'https://picsum.photos/200'
		}
	]
*/
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
				/>
			</Link>
		</li>
	)
}
