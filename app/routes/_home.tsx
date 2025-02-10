import { Outlet } from 'react-router'
import { PageLogo } from '~/components/page-logo'
import { auth } from '~/services/auth.server'
import type { Route } from './+types/_home'
import { HomeFooter } from '~/components/home-footer'
import SessionHeader from '~/components/session-header'
import { Container, Flex, Grid } from '@radix-ui/themes'

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
		<Container maxWidth='800px'>
			<Grid columns='1' gap='4' rows='auto 1fr auto' width='auto'>
				<Flex justify='between' align='baseline'>
					<PageLogo />
					<SessionHeader sessionData={sessionData} />
				</Flex>

				<Outlet />

				<HomeFooter />
			</Grid>
		</Container>
	)
}
