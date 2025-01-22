import { Link, Outlet } from 'react-router'
import { SessionMenuButton } from '~/components/home/session'
import { auth } from '~/lib/auth.server'
import type { Route } from './+types/_home'
import styles from './_home.module.css'

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

	return { userEmail, userProfileUrl, claims }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { userEmail, userProfileUrl, claims } = loaderData
	const isOrganizer = claims?.includes('organizer') || claims?.includes('root')

	return (
		<div className='container'>
			<header className={styles.homeHeader}>
				<div>
					<Link to='/'>
						<div className={styles.logoContainer}>
							<img src='/logo/ac.png' alt='logo' className={styles.logo} />
							<h1>Airsoft Naptár</h1>
						</div>
					</Link>
				</div>
				<div>{isOrganizer && <Link to='/dashboard'>szervezői oldal</Link>}</div>
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
