import { Outlet } from 'react-router'
import { HomeHeader } from '~/components/home-header'
import { auth } from '~/services/auth.server'
import type { Route } from './+types/_home'
import { HomeFooter } from '~/components/home-footer'
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
			content: 'og-image.jpg'
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
		<section className='container min-h-screen grid grid-rows-[auto_1fr_auto] p-2 mx-auto'>
			<div className='flex flex-row flex-wrap justify-between gap-4 mb-6'>
				<HomeHeader />
				<SessionHeader sessionData={sessionData} />
			</div>

			<Outlet />

			<HomeFooter />
		</section>
	)
}
