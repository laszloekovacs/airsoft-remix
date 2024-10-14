import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import React from 'react'
import { getSession } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))

	// check for admin claim
	if (!session.data.user?.claims.includes('admin')) {
		throw new Response('/', {
			status: 403,
			statusText: 'Forbidden'
		})
	}
}

const AdminPage = () => {
	return <div>AdminPage</div>
}

export default AdminPage
