import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { getSession } from '~/services/session.server'

// this is called by github oauth
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))
	const data = session.data

	// TODO: check if user is already registered
	console.log('session', data)

	return authenticator.authenticate('github', request, {
		successRedirect: '/onboarding',
		failureRedirect: '/'
	})
}
