type EventListItem = {
	id: number
	title: string
	url: string
	createdBy: string
	startDate: string
	coverPhoto: string
}

type EventListProps = {
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

const EventListItem = (event: EventListItem) => <li>{event.title}</li>
