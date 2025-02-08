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
			<h2 className='font-bold mb-6'>Általad meghírdetett játékok</h2>
			<>
				{events.length ? (
					<EventsList events={events} />
				) : (
					<p>Nincsenek megjeleníthető játékok</p>
				)}
			</>
		</div>
	)
}

const EventsList = ({ events }: { events: CalendarEventType[] }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>dátum</th>
					<th>Játék neve</th>
				</tr>
			</thead>
			<tbody>
				{events.map(event => (
					<tr key={event.id}>
						<td>{event.startDate}</td>
						<td>
							<Link to={`/event/${event.id}`}>{event.title}</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
