import type { Route } from './+types/_home.event.$groupId_.$eventId'

export const loader = async () => {
	const title = 'Jótékonysági játék'

	const organizer = {
		name: 'Kovács János',
		logo: 'https://picsum.photos/150'
	}

	return { title, organizer }
}

export default function EventDetailsPage({ loaderData }: Route.ComponentProps) {
	const data = loaderData

	return (
		<div>
			<h1>{data.title}</h1>
			<div>
				<h2>szervező</h2>
				<div>
					<img src={data.organizer.logo} alt={data.organizer.name} />
					<h3>{data.organizer.name}</h3>
				</div>
			</div>
		</div>
	)
}
