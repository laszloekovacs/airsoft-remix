import type { Route } from '.react-router/types/app/routes/_home/+types/route'
import { Outlet } from 'react-router'
import SessionHeader from '~/routes/_home/SessionHeader'
import { HomeFooter } from '~/routes/_home/HomeFooter'
import { PageLogo } from '~/routes/_home/PageLogo'
import { getCookieFromRequest } from '~/services/auth.server'

export function meta({}: Route.MetaArgs) {
	const url = import.meta.url

	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: url },
		{ property: 'og:title', content: 'Airsoft Naptár' },
		{ property: 'og:description', content: 'Airsoft esemény naptár' },
		{ property: 'og:site_name', content: 'Airsoft Naptár' },
		{
			property: 'og:image',
			content: 'og-image.jpg'
		}
	]
}

export async function loader({ request }: Route.LoaderArgs) {
	const sessionData = await getCookieFromRequest(request)
	return sessionData
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
	const sessionData = loaderData

	return (
		<div>
			<div className='flex justify-between flex-row'>
				<PageLogo />
				<SessionHeader sessionData={sessionData} />
			</div>

			<Outlet />

			<HomeFooter />
		</div>
	)
}
