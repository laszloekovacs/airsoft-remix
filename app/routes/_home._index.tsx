import { Link } from 'react-router'
import type { Route } from './+types/_home._index'

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

			<div>
				<span>oldalak</span>
				<ul className='flex flex-row gap-3'>
					<li>1</li>
					<li>2</li>
					<li>3</li>
				</ul>
			</div>
		</div>
	)
}
