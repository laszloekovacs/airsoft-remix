import { Link } from 'react-router'
import type { event as CalendarEvent } from '~/schema'
import CoverPhoto from './cover-photo'
import Avatar from './avatar'
import styles from './event-list.module.css'

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
		<li>
			<Link to={`/event/${event.urlPath}`}>
				<div className={styles.container}>
					<div className={styles.title}>
						<h2>{event.title}</h2>
						<EventSummary date={'2022-12-31'} location={'Budapest'} />
					</div>

					<CoverPhoto />

					{/* organizer patch */}
					<div className={styles.footer}>
						<Avatar />
					</div>
				</div>
			</Link>
		</li>
	)
}

const EventSummary = ({
	date,
	location
}: {
	date: string
	location: string
}) => {
	return (
		<div className={styles.summary}>
			<p>{date}</p>
			<p>{location}</p>
		</div>
	)
}
