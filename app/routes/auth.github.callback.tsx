import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from 'services/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return authenticator.authenticate('github', request, {
		successRedirect: '/onboarding',
		failureRedirect: '/login'
	})
}
