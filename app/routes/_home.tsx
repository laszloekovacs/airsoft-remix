import { Outlet } from 'react-router'
import { HomeHeader } from '~/components/home-header'
import { auth } from '~/services/auth.server'
import type { Route } from './+types/_home'
import { HomeFooter } from '~/components/home-footer'
import styles from './_home.module.css'
import SessionHeader from '~/components/session-header'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' },
		{ property: 'og:url', content: 'www.localhost:3000' },
		{ property: 'type', content: 'website' },
		{ property: 'og:title', content: 'Airsoft Naptár' },
		{ property: 'og:description', content: 'Airsoft esemény naptár' },
		{
			property: 'og:image',
			content: 'https://www.localhost:3000/og-image.jpg'
		},
		{ property: 'og:site_name', content: 'Airsoft Naptár' }
	]
}

export async function loader({ params, request }: Route.LoaderArgs) {
	// returns email, if logged in aka session is not null
	const session = await auth.api.getSession({ headers: request.headers })

	return session
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
	const sessionData = loaderData

	return (
		<div className={styles.container}>
			<div>
				<HomeHeader />
				<SessionHeader sessionData={sessionData} />
			</div>
			<main>
				<Outlet />
			</main>
			<HomeFooter />
		</div>
	)
}
