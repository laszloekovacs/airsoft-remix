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
	const user_email = session?.user.email || null
	const user_image_url = session?.user.image || null

	return { buildDate, user_email, user_image_url }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { buildDate, user_email, user_image_url } = loaderData

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
							userEmail={user_email}
							imageUrl={user_image_url}
						/>
					</header>

					<main>
						<Outlet />
					</main>

					<footer>
						<hr />
						<p>© {new Date().getFullYear()} Airsoft Naptár</p>

						<span>
							verzió:{' '}
							{buildDate.toLocaleString('hu-HU', {
								dateStyle: 'medium',
								timeStyle: 'short'
							})}
						</span>
					</footer>
				</div>
			</div>
		</div>
	)
}
