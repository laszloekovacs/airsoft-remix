import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	return { id: params.id }
}

const EventDetailPage = () => {
	const { id } = useLoaderData<typeof loader>()

	return <div>EventDetailPage for {id}</div>
}

export default EventDetailPage
