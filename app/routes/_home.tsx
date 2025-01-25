import { Outlet } from 'react-router'
import { Header } from '~/components/home-header'
import { auth } from '~/services/auth.server'
import type { Route } from './+types/_home'
import { HomeFooter } from '~/components/home-footer'

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
		<div className='p-3'>
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
