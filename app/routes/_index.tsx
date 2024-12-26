import { Link } from 'react-router'
import type { Route } from './+types/_index'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' }
	]
}

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Link to='/dashboard'>Dashboard</Link>
		</div>
	)
}
