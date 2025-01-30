import { Link } from 'react-router'
import UserCreatedEventsTable from '~/components/user-created-events-table'

export default function ProfileIndexPage() {
	return (
		<div>
			<ProfileNavbar />
			<UserCreatedEventsTable
				events={[
					{
						id: 1,
						title: 'event one'
					}
				]}
			/>
		</div>
	)
}

const ProfileNavbar = () => {
	return (
		<nav>
			<Link to='/profile'>főoldalad</Link>
			<Link to='/profile/events'>hirdetéseid</Link>
			<Link to='/profile/applications'>jelentkezéseid</Link>
		</nav>
	)
}
