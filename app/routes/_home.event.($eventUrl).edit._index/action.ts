import { eq } from 'drizzle-orm'
import { redirect } from 'react-router'
import { generateUrlName as generateUrlSafeName } from '~/helpers/generate-url-name'
import { event } from '~/schema'
import { getSession } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/route'

type ActionResultModel = {
	id: string
	url: string
	isAvailable: boolean
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionCookie = await getSession(request)
	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	const formData = await request.json()
	const { id, title, startDate, intent } = formData

	const generatedUrl = startDate + '-' + generateUrlSafeName(title)
	let isAvaliable = false

	switch (intent) {
		case 'save': {
			const result = await drizzleClient
				.update(event)
				.set({
					title,
					startDate,
					url: generatedUrl
				})
				.where(eq(event.id, id))
				.returning({ id: event.id, url: event.url })

			return redirect(`/event/${result[0].url}/edit`)
		}

		case 'verify': {
			// check if it's not in use
			const result = await drizzleClient
				.select()
				.from(event)
				.where(eq(event.url, generatedUrl))

			// not found, or its the current event, safe to use
			if (result.length == 0 || result[0].id == id) {
				isAvaliable = true
			}

			const response: ActionResultModel = {
				id,
				url: generatedUrl,
				isAvailable: isAvaliable
			}

			return response
		}

		default:
			throw new Response('Bad intent', { status: 400 })
	}
}
