import TimeTable from '~/components/time-table'
import type { Route } from './+types/_home.event_.$id'
import OrganizerTitleCard from '~/components/orgranizer-title-card'
import PricingTable from '~/components/pricing-table'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const title = 'Jotékonysági játék'

	const timeTable = [
		{ time: '10:00', label: 'Regisztráció' },
		{ time: '11:00', label: 'Játék' },
		{ time: '12:00', label: 'Vége' }
	]

	const date = new Date().toString()

	const prices = [{ label: 'belépő', price: 1000 }]

	return {
		title,
		timeTable,
		date,
		prices
	}
}

const EventPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, timeTable, date, prices } = loaderData

	return (
		<div>
			<h1>{title}</h1>

			<h2>Szervező csoport</h2>
			<OrganizerTitleCard id='33' name='the jucers' url='/' />
			<TimeTable times={timeTable} date={date} />
			<PricingTable prices={prices} />
		</div>
	)
}

export default EventPage
