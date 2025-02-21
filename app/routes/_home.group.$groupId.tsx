import Address from '~/components/AddressView'
import Avatar from '~/components/avatar'
import BackButton from '~/components/back-button'
import CommentsContainer from '~/components/comments'
import ContactList from '~/components/contact-list'
import CoverPhoto from '~/components/cover-photo'
import UserTable from '~/components/user-table'

const groupName = 'Airforce 5'
const address = {
	country: 'USA',
	street: '123 Main St',
	city: 'Springfield',
	state: 'IL',
	zip: '62701'
}

const members = [
	{
		id: '1',
		avatar: null,
		callsign: 'Pilot 1',
		group: 'Airforce 5'
	},
	{
		id: '2',
		avatar: null,
		callsign: 'Pilot 2',
		group: 'Airforce 5'
	},
	{
		id: '3',
		avatar: null,
		callsign: 'Pilot 3',
		group: 'Airforce 5'
	}
]

export default function GroupDetailPage() {
	return (
		<div>
			<BackButton />
			<h2>{groupName}</h2>
			<Avatar />
			<CoverPhoto />
			<Address address={address} />
			<ContactList contacts={[]} />
			<UserTable players={members} />
			<CommentsContainer comments={[]} />
		</div>
	)
}
