import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { getSession } from 'services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))

	return { session }
}

const dash = () => {
	const { session } = useLoaderData<typeof loader>()

	return <pre>{JSON.stringify(session, null, 2)}</pre>
}

export default dash
