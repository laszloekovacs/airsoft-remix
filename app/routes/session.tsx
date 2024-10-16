import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getSession } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))

	return { session }
}

const dash = () => {
	const { session } = useLoaderData<typeof loader>()

	return (
		<div>
			<Link to='/auth/github/login'>Onboarding</Link>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	)
}

export default dash
