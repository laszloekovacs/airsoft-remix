import type { Route } from '.react-router/types/app/routes/_home.event.$eventUrl.apply/+types/route'
import { getSessionCookie, isSessionCookie } from '~/services/auth.server'

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = await getSessionCookie(request)

	if (!isSessionCookie(sessionCookie)) {
		throw new Error('Unauthorized')
	}

	return {}
}
