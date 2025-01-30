import { Link } from 'react-router'
import UserCreatedEventsTable from '~/components/user-created-events-table'

export default function ProfileIndexPage() {
	return (
		<div>
			<Navbar />
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

const Navbar = () => {
	return (
		<nav>
			<Link to='/profile'>oldalad</Link>
			<Link to='/profile/events'>hirdetéseid</Link>
		</nav>
	)
}
