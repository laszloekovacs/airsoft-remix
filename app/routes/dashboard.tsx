import { Link, type LoaderFunctionArgs } from 'react-router'
import { authClient } from '~/lib/auth.client'
import { auth } from '~/lib/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) {
		console.log('No session found')
	} else {
		console.log(session)
	}

	return { status: 'ok' }
}

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<Link to='/'>Home</Link>
		</div>
	)
}
