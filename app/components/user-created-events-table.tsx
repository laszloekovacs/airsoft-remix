// list of events managed by a user

import { Link } from 'react-router'
import { event as CalendarEvent } from '~/schema'

type CalendarEventType = typeof CalendarEvent.$inferSelect

export default function UserCreatedEventsTable({
	events
}: {
	events: CalendarEventType[]
}) {
	return (
		<div>
			{events.length ? (
				<EventsList events={events} />
			) : (
				<p>Nincsenek megjeleníthető játékok</p>
			)}
		</div>
	)
}

const EventsList = ({ events }: { events: CalendarEventType[] }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Játék neve</th>
					<th>Regisztrált</th>
				</tr>
			</thead>
			<tbody>
				{events.map(event => (
					<tr key={event.id}>
						<td>
							<Link to={`/event/${event.id}`}>{event.title}</Link>
						</td>
						<td>0</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
