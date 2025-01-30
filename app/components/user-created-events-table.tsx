// list of events managed by a user

import { Link } from 'react-router'

type Props = {
	events: Array<{
		id: number
		title: string
	}>
}

export default function UserCreatedEventsTable({ events }: Props) {
	const emptyList = <p>Nincsenek megjeleníthető játékok</p>

	return (
		<div>
			<h2>Általad meghírdetett játékok</h2>
			{events.length ? <EventsList events={events} /> : emptyList}
		</div>
	)
}

const EventsList = ({ events }: Props) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Játékok</th>
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
