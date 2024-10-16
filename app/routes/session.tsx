import { LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { getSession } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))

	return { session }
}

const dash = () => {
	const { session } = useLoaderData<typeof loader>()

	return (
		<div>
			<Form method='post' action='/logout'>
				<button type='submit'>Logout</button>
			</Form>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	)
}

export default dash
