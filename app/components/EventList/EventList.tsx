import { Link } from 'react-router'

export type EventListItem = {
	id: string
	title: string
	url: string
	createdBy: string
	startDate: string
	coverPhoto: string
}

export type EventListProps = {
	events: EventListItem[]
}

export const EventList = (props: EventListProps) => {
	const { events } = props

	return (
		<ul data-testid='event-list'>
			{events.map(event => (
				<EventListItem key={event.id} {...event} />
			))}
		</ul>
	)
}

const EventListItem = (event: EventListItem) => (
	<li>
		<Link to={`/event/${event.url}`}>
			<h2>{event.title}</h2>
			<p>{event.startDate}</p>
			<p>{event.createdBy}</p>

			<img src={event.coverPhoto} alt={event.title} />
		</Link>
	</li>
)
