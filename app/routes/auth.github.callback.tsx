import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

// this is called by github oauth
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const formData = await request.formData()
	console.log(Object.fromEntries(formData))

	return authenticator.authenticate('github', request, {
		successRedirect: '/onboarding',
		failureRedirect: '/'
	})
}
