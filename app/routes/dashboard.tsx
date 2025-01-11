import { Link } from 'react-router'
import type { Route } from './+types/dashboard'
import { getBuildDate } from '~/lib/build.server'
import { auth } from '~/lib/auth.server'
import { Outlet } from 'react-router'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) {
		console.log('No session found')
	}

	const build = getBuildDate().toLocaleDateString('en-US')

	return { status: 'ok', build }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
	const { build } = loaderData

	return (
		<div>
			<h1>Dashboard</h1>

			<Link to='/'>Home</Link>
			<br />
			<Link to='/dashboard/post'>new post</Link>

			<main>
				<Outlet />
			</main>

			<p>{build}</p>
		</div>
	)
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Admin' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}
