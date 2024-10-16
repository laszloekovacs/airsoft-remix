import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

// call this from the app to login
export const loader = ({ request }: LoaderFunctionArgs) => {
	return authenticator.authenticate('github', request)
}
