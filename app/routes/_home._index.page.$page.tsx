import { Link } from 'react-router'
import type { Route } from './+types/_home._index.page.$page'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

//TODO: use query param to display page

export default function Home() {
	return <EventCalendarContainer />
}

const EventCalendarContainer = () => {
	return (
		<div>
			<h2>Események</h2>
			<EventsList />
		</div>
	)
}

const EventsList = () => {
	const events = [
		{
			id: 1,
			name: 'Event 1',
			date: '2021-09-01'
		},
		{
			id: 2,
			name: 'Event 2',
			date: '2021-09-02'
		}
	]

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
	event: { id: number; name: string; date: string }
}) => {
	return (
		<li>
			<h2>
				<Link to={`/events/${event.id}`}>{event.name}</Link>
			</h2>
			<p>{event.date}</p>
		</li>
	)
}
