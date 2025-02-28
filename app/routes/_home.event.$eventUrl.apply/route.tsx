import type { Route } from '.react-router/types/app/routes/_home.event.$eventUrl.apply/+types/route'
import { getSessionCookie } from 'better-auth'
import { isSessionCookie } from '~/services/auth.server'

export const loader = ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = getSessionCookie(request)
	if (!isSessionCookie(sessionCookie)) {
		throw new Response('Unauthorized', { status: 401 })
	}

	return {}
}
