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
		<li className={styles.card}>
			<Link to={`/event/${event.url}`}>
				<div className={styles.container}>
					<div className={styles.date}>
						<p>{event.startDate}</p>
						<p>12:00</p>
					</div>
					<h2 className={styles.title}>{event.title}</h2>
					<CoverPhoto />
				</div>
				<div>{event.createdBy} által megosztva</div>
			</Link>
		</li>
	)
}
