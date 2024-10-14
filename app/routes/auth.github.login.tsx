import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader = () => {
	return redirect('/')
}

export const action = ({ request }: ActionFunctionArgs) => {
	return authenticator.authenticate('github', request)
}
