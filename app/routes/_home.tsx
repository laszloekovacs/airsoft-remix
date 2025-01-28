import { Outlet } from 'react-router'
import { Header } from '~/components/home-header'
import { auth } from '~/services/auth.server'
import type { Route } from './+types/_home'
import { HomeFooter } from '~/components/home-footer'
import styles from './_home.module.css'

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
	const userEmail = session?.user.email
	const userProfileUrl = session?.user.image
	const claims = session?.claims

	return { userEmail, userProfileUrl, claims }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
	const { userEmail, userProfileUrl, claims } = loaderData
	const isOrganizer = claims?.includes('organizer') || claims?.includes('root')

	return (
		<div className={styles.container}>
			<Header
				userEmail={userEmail}
				userProfileUrl={userProfileUrl}
				isOrganizer={isOrganizer}
			/>

			<main>
				<Outlet />
			</main>

			<HomeFooter />
		</div>
	)
}
