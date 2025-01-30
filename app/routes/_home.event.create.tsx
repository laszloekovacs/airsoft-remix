import { Form } from 'react-router'
import type { Route } from './+types/_home.event.create'
import { redirect } from 'react-router'
import { drizzleClient } from '~/services/db.server'
import { event } from '~/schema'
import { auth } from '~/services/auth.server'
import { generateUrlName } from '~/services/generate-url-name'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) throw redirect('/')

	return { user: session.user }
}

export default function EventCreationPage() {
	return (
		<div>
			<h1>uj jatek meghirdetese</h1>
			<Form method='post' encType='application/x-www-form-urlencoded'>
				<label htmlFor='name'>Esemeny neve</label>
				<input type='text' name='title' required />

				<label htmlFor='date'>Esemeny napja</label>
				<input type='date' name='startDate' required />

				<input type='submit' name='submit' value='tovabb' />
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData()

	const title = formData.get('title') as string
	const startDate = formData.get('startDate') as string

	//TODO: make sure name doesnt clash with keywords

	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) throw new Response(null, { status: 401 })

	if (title.length < 3)
		throw new Error('A neve minimum 3 karakter kell hogy legyen')

	const { user } = session

	// generate url for event
	const eventUrl = generateUrlName(title)

	const result = await drizzleClient
		.insert(event)
		.values({
			title,
			startDate,

			url: eventUrl,
			createdBy: user.id
		})
		.returning({ id: event.id, url: event.url })

	if (result.length == 0) {
		throw new Error('nem sikerult letrehozni')
	}

	return redirect(`/event/${result[0].url}`)
}
