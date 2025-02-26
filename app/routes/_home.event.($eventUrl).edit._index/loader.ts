import { eq } from 'drizzle-orm'
import { event } from '~/schema'
import { getSession } from '~/services/auth.server'
import { db } from '~/services/db.server'
import type { Route } from './+types/route'

export type LoaderDataViewModel = {
	id: string
	url: string
	title: string
	startDate: string
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = await getSession(request)
	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	let result

	if (params.eventUrl) {
		result = await db.select().from(event).where(eq(event.url, params.eventUrl))

		if (result.length == 0) {
			throw new Response('not found', { status: 404 })
		}

		if (result.length > 1) {
			throw new Response('url not unique', { status: 500 })
		}
	}

	const loaderData: LoaderDataViewModel = {
		id: result?.[0].id || '',
		url: params.eventUrl || '',
		title: result?.[0].title || '',
		startDate: result?.[0].startDate || ''
	}

	return loaderData
}
