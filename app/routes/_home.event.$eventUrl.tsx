import Markdown from 'react-markdown'
import Address from '~/components/AddressView'
import OrganizerTitleCard from '~/components/organizer-title-card'
import PricingTable from '~/components/pricing-table'
import TimeTable from '~/components/time-table'
import type { Route } from './+types/_home.event.$eventUrl'
import FacebookShareButton from '~/components/facebook-share-button'
import AttendeesTableContainer from '~/components/attendees-table'
import CommentsContainer from '~/components/comments'
import type { CommentType } from '~/components/comments'
import BackButton from '~/components/back-button'
import { Link } from 'react-router'
import CoverPhoto from '~/components/cover-photo'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const title = 'Jotékonysági játék'

	const attendees = {
		factions: [
			{
				name: 'Team red',
				members: [
					{
						id: '1',
						name: 'John Doe',
						callsign: 'JD',
						avatar: 'https://picsum.photos/200/300',
						group: 'the juicers'
					},
					{
						id: '2',
						name: 'Mike jeffs',
						callsign: 'Juice',
						avatar: 'https://picsum.photos/200/300',
						group: 'the juicers'
					}
				]
			},
			{
				name: 'Team blue',
				members: [
					{
						id: '3',
						name: 'Jane Doe',
						callsign: 'JD',
						avatar: 'https://picsum.photos/200/300',
						group: 'the juicers'
					}
				]
			}
		]
	}

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
		comments,
		attendees
	}
}

const EventPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, timeTable, date, prices, address, comments, attendees } =
		loaderData

	return (
		<div>
			<BackButton />
			<Link to='edit'>szerkesztés</Link>
			<h1 className='text-2xl font-bold my-6'>{title}</h1>
			<FacebookShareButton />

			{/* organizer title card */}
			<div className='my-4'>
				<OrganizerTitleCard id='33' name='the jucers' url='/' />
			</div>

			{/* cover photo of the event */}
			<CoverPhoto />

			{/* event details, information */}
			<div className='flex flex-row flex-wrap gap-4'>
				<TimeTable times={timeTable} date={date} />
				<PricingTable prices={prices} />
				<Address address={address} />
			</div>

			{/* description formated with markdown */}
			<Markdown>{`### hello from markdown`}</Markdown>

			{/* atending teams */}
			<AttendeesTableContainer data={attendees} />

			{/* comments */}
			<CommentsContainer comments={comments} />
		</div>
	)
}

export default EventPage
