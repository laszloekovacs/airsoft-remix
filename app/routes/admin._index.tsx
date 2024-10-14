import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import React from 'react'
import { getSession } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))

	// check for admin claim
	if (!session.data.user?.claims.includes('admin')) {
		return new Response('Forbidden', {
			status: 403,
			statusText: 'Forbidden'
		})
	} else {
		return new Response('ok', { status: 200 })
	}
}

const AdminPage = () => {
	return (
		<div>
			<h2>AdminPage</h2>

			<nav></nav>
		</div>
	)
}

export default AdminPage
