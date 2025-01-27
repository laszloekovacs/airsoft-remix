import Markdown from 'react-markdown'
import Address from '~/components/address'
import OrganizerTitleCard from '~/components/organizer-title-card'
import PricingTable from '~/components/pricing-table'
import TimeTable from '~/components/time-table'
import type { Route } from './+types/_home.event_.$id'
import FacebookShareButton from '~/components/facebook-share-button'
import AttendeesTableContainer from '~/components/attendees-table'
import CommentsContainer from '~/components/comments'
import type { CommentType } from '~/components/comments'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const title = 'Jotékonysági játék'

	const timeTable = [
		{ time: '10:00', label: 'Regisztráció' },
		{ time: '11:00', label: 'Játék' },
		{ time: '12:00', label: 'Vége' }
	]

	const date = new Date().toString()

	const prices = [{ label: 'belépő', price: 1000 }]

	const address = {
		country: 'Magyarország',
		city: 'Budapest',
		zip: '1111',
		street: 'Kossuth Lajos utca 1.'
	}

	const comments = [
		{
			id: 1,
			user: 'John Doe',
			avatar: 'https://picsum.photos/50',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			replies: [
				{
					id: 1,
					user: 'Jane Doe',
					avatar: 'https://picsum.photos/50',
					text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				}
			]
		}
	] as CommentType[]

	return {
		title,
		timeTable,
		date,
		prices,
		address,
		comments
	}
}

const EventPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, timeTable, date, prices, address, comments } = loaderData

	return (
		<div>
			<h1>{title}</h1>
			<FacebookShareButton />

			{/* TODO: event splash image */}

			<figure>
				<figcaption>szervező</figcaption>
				<OrganizerTitleCard id='33' name='the jucers' url='/' />
			</figure>
			<TimeTable times={timeTable} date={date} />
			<PricingTable prices={prices} />
			<Address data={address} />

			{/* description formated with markdown */}
			<Markdown>{`### hello from markdown`}</Markdown>

			{/* atending teamsContainer */}
			<AttendeesTableContainer data={null} />
			{/* comments */}
			<CommentsContainer comments={comments} />
		</div>
	)
}

export default EventPage
