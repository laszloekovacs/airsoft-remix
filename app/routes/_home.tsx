import { Link, Outlet } from 'react-router'
import { SessionMenuButton } from '~/components/session'
import { auth } from '~/lib/auth.server'
import { getBuildDate } from '~/lib/build.server'
import type { Route } from './+types/_home'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const buildDate = getBuildDate()

	// returns email, if logged in aka session is not null
	const session = await auth.api.getSession({ headers: request.headers })
	const userEmail = session?.user.email || null
	const userProfileUrl = session?.user.image || null

	return { buildDate, userEmail, userProfileUrl }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { buildDate, userEmail, userProfileUrl } = loaderData

	return (
		<div>
			<div className='container mx-auto px-2'>
				<div className='grid min-h-screen grid-rows-[auto,1fr,auto] py-2'>
					<header className='flex flex-row justify-between pb-4'>
						<Link to='/'>
							<img src='/logo/ac.png' alt='logo' className='h-20' />
							<h1>Airsoft Naptár</h1>
						</Link>
						<Link to='/user'>Profil</Link>
						<SessionMenuButton
							userEmail={userEmail}
							imageUrl={userProfileUrl}
						/>
					</header>

					<main>
						<Outlet />
					</main>

					<footer>
						<hr />
						<p>© {new Date().getFullYear()} Airsoft Naptár</p>

						<span>
							<span>verzió: </span>
							{buildDate
								? buildDate.toLocaleString('hu-HU', {
										dateStyle: 'medium',
										timeStyle: 'short'
								  })
								: '...'}
						</span>
					</footer>
				</div>
			</div>
		</div>
	)
}
