import { Outlet } from 'react-router'
import { HomeFooter } from '~/routes/_home/HomeFooter'
import { PageLogo } from '~/components/page-logo'
import SessionHeader from '~/components/session-header'
import { getCookieFromRequest } from '~/services/auth.server'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' },
		{ property: 'og:url', content: 'www.localhost:3000' },
		{ property: 'type', content: 'website' },
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
	// returns email, if logged in aka session is not null
	const session = await getCookieFromRequest(request)

	return session
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
	const sessionData = loaderData

	return (
		<div>
			<div>
				<div>
					<PageLogo />
					<SessionHeader sessionData={sessionData} />
				</div>

				<Outlet />

				<HomeFooter />
			</div>
		</div>
	)
}
