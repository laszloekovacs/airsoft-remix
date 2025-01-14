import { Link, Outlet, redirect } from 'react-router'
import type { Route } from './+types/_home'
import { SessionMenuButton } from '~/components/session'
import { getBuildDate } from '~/lib/build.server'
import { auth } from '~/lib/auth.server'
import invariant from 'tiny-invariant'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const buildDate = getBuildDate()
	const buildDateString = buildDate.toLocaleString('hu-HU', {
		dateStyle: 'medium',
		timeStyle: 'short'
	})
	const copyDate = new Date().getFullYear()

	const session = await auth.api.getSession({ headers: request.headers })
	const user_email = session?.user.email

	return { buildDateString, copyDate, user_email }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { buildDateString, copyDate, user_email } = loaderData

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
						{<SessionMenuButton username={user_email} />}
					</header>

					<main>
						<Outlet />
					</main>

					<footer>
						<span>© {copyDate} Airsoft Naptar</span>
						<div>
							<Link to='/dashboard'>Admin felület</Link>
							<br />
							<Link to='/user'>user</Link>
						</div>
						<span>verzio: {buildDateString}</span>
					</footer>
				</div>
			</div>
		</div>
	)
}
