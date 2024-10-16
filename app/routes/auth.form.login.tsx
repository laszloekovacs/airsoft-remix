import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

// this is called by github oauth
export const loader = async ({ request }: LoaderFunctionArgs) => {
	return authenticator.authenticate('github', request, {
		successRedirect: '/',
		failureRedirect: '/'
	})
}
