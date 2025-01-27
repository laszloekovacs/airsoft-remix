import Address from '~/components/address'
import Avatar from '~/components/avatar'
import CoverPhoto from '~/components/cover-photo'

export default function GroupDetailPage() {
	const groupName = 'Airforce 5'
	const address = {
		country: 'USA',
		street: '123 Main St',
		city: 'Springfield',
		state: 'IL',
		zip: '62701'
	}

	return (
		<div>
			<h2>{groupName}</h2>
			<Avatar />
			<CoverPhoto />
			<Address data={address} />
		</div>
	)
}
