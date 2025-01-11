import { Link } from 'react-router'
import type { Route } from './+types/dashboard'
import { Outlet } from 'react-router'

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>

			<Link to='/'>Home</Link>
			<br />
			<Link to='/dashboard/post'>new post</Link>

			<main>
				<Outlet />
			</main>
		</div>
	)
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Admin' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}
