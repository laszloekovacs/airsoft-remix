import { Link } from 'react-router'
import UserCreatedEventsTable from '~/components/user-created-events-table'

export default function UserIndexPage() {
	return (
		<div>
			<UserCreatedEventsTable
				events={[
					{
						id: 1,
						title: 'event one'
					}
				]}
			/>
			<div>
				<Link to='/user/event/edit'>új létrehozása</Link>
			</div>
		</div>
	)
}

const ProfileNavbar = () => {
	return (
		<nav>
			<Link to='/user'>főoldalad</Link>
			<Link to='/user/events'>hirdetéseid</Link>
			<Link to='/user/applications'>jelentkezéseid</Link>
		</nav>
	)
}
