import { Link, Outlet } from 'react-router'
import { SessionMenuButton } from '~/components/session'
import { auth } from '~/lib/auth.server'

import type { Route } from './+types/_home'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export async function loader({ params, request }: Route.LoaderArgs) {
	// returns email, if logged in aka session is not null
	const session = await auth.api.getSession({ headers: request.headers })
	const userEmail = session?.user.email || null
	const userProfileUrl = session?.user.image || null
	const claims = session?.claims || null
	console.log('claims', claims)
	return { userEmail, userProfileUrl, claims }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { userEmail, userProfileUrl, claims } = loaderData
	const isOrganizer = claims?.includes('organizer') || claims?.includes('root')

	return (
		<div>
			<header className='flex flex-row justify-between pb-4'>
				<Link to='/'>
					<div className='flex flex-row	items-center'>
						<img src='/logo/ac.png' alt='logo' className='h-20' />
						<h1 className='text-4xl'>Airsoft Naptár</h1>
					</div>
				</Link>
				{isOrganizer && <Link to='/dashboard'>szervezői oldal</Link>}
				<SessionMenuButton userEmail={userEmail} imageUrl={userProfileUrl} />
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				<hr />
				<p>© {new Date().getFullYear()} Airsoft Naptár</p>
			</footer>
		</div>
	)
}
