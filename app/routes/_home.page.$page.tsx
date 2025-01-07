import type { Route } from './+types/_home.page.$page'
import { EventCalendarContainer } from '~/components/eventcalendarcontainer'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

//TODO: maybe use query param to display page

export default function Home() {
	return <EventCalendarContainer />
}
