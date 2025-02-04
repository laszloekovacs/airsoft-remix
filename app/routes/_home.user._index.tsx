import { Link } from 'react-router'
import UserCreatedEventsTable from '~/components/user-created-events-table'

export default function UserIndexPage() {
	return (
		<div>
			<UserCreatedEventsTable events={[]} />
			<div>
				<Link to='/event/edit'>új játék létrehozása</Link>
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
