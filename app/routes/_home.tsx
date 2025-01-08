import { Link, Outlet } from 'react-router'
import type { Route } from './+types/_home'
import { SessionMenuButton } from '~/components/session-menu'
import { getBuildDate } from '~/lib/build.server'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export function loader({ params }: Route.LoaderArgs) {
	const buildDate = getBuildDate()

	return { buildDate }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { buildDate } = loaderData
	const buildDateString = buildDate.toLocaleString('hu-HU', {
		dateStyle: 'medium',
		timeStyle: 'short'
	})
	const copyDate = new Date().getFullYear()

	return (
		<div className='bg-stone-100'>
			<div className='container mx-auto px-2'>
				<div className='grid min-h-screen grid-rows-[auto,1fr,auto] py-2'>
					<header className='flex flex-row justify-between pb-4'>
						<Link to='/'>
							<h1>Airsoft Naptár</h1>
						</Link>
						<SessionMenuButton />
					</header>

					<main>
						<Outlet />
					</main>

					<footer>
						<span>© {copyDate} Airsoft Naptar</span>
						<div>
							<Link to='/dashboard'>Admin felület</Link>
							<br />
							<Link to='/user/u'>user</Link>
						</div>
						<span>verzio: {buildDateString}</span>
					</footer>
				</div>
			</div>
		</div>
	)
}
