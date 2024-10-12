import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSession } from 'services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await getSession(request.headers.get('Cookie'))

	return { user }
}

const Onboarding = () => {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<div>Onboarding</div>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	)
}

export default Onboarding
