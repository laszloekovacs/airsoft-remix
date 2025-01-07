import { Link, Outlet } from 'react-router'
import type { Route } from './+types/_home'
import { SessionMenuButton } from '~/components/sessionmenu'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export default function Home() {
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
						<span>Airsoft Naptár c. 2025</span>
						<div>
							<Link to='/dashboard'>Admin felület</Link>
						</div>
					</footer>
				</div>
			</div>
		</div>
	)
}
