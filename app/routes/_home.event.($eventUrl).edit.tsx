import { eq } from 'drizzle-orm'
import { useState } from 'react'
import { redirect, useFetcher } from 'react-router'
import { TipTapEditor } from '~/components/tiptap-editor'
import { event } from '~/schema'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import { generateUrlName } from '~/helpers/generate-url-name'
import type { Route } from './+types/_home.event.($eventUrl).edit'
import BackButton from '~/components/back-button'

export const loader = async ({ params, request }: Route.ActionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) {
		throw new Response('Unauthorized', { status: 401 })
	}

	// it's a new event.
	if (!params.eventUrl) {
		return { eventData: {} as typeof event.$inferSelect }
	}

	// load inital event data.
	const eventData = await drizzleClient
		.select()
		.from(event)
		.where(eq(event.url, params.eventUrl))

	if (!eventData || eventData.length == 0) {
		throw new Response('Event not found', { status: 404 })
	}

	// check if user id is the sames as event creator
	if (eventData[0].createdBy !== session.user.id) {
		throw new Response('Forbidden, ez nem a te eseményed!', { status: 403 })
	}

	return { eventData: eventData[0] }
}

export default function EventEditPage({ loaderData }: Route.ComponentProps) {
	const { eventData } = loaderData
	const fetcher = useFetcher()
	const [formData, setFormData] = useState(eventData)

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		await fetcher.submit(JSON.stringify(formData), {
			method: 'post',
			encType: 'application/json'
		})
	}

	return (
		<div>
			<BackButton />
			<div>
				<label htmlFor='id'>esemény azonosítószáma</label>
				<input type='hidden' name='id' defaultValue={formData.id} />
				<output id='id'>{formData.id}</output>
			</div>

			<div>
				<label htmlFor='url'>Esemény URL:</label>
				<output id='url'>{formData.url}</output>
			</div>

			<div>
				<label htmlFor='title'>Esemény Címe:</label>
				<input
					required
					type='text'
					id='title'
					name='title'
					value={formData.title}
					onChange={e => {
						setFormData({ ...formData, title: e.target.value })
					}}
				/>
			</div>

			<div>
				<label htmlFor='startDate'>Esemény Napja:</label>
				<input
					required
					type='date'
					id='startDate'
					name='startDate'
					value={formData.startDate}
					onChange={e => {
						setFormData({ ...formData, startDate: e.target.value })
					}}
				/>
			</div>

			<div>
				<label htmlFor='isPublished'>Nyilvános?:</label>
				<input
					type='checkbox'
					id='isPublished'
					name='isPublished'
					value={formData.isPublished ? 'on' : 'off'}
					onChange={e => {
						setFormData({ ...formData, isPublished: e.target.checked })
					}}
				/>
			</div>

			<div>
				<label htmlFor='description'>Esemény leírása:</label>
				<TipTapEditor
					defaultValue={formData.description ?? ''}
					onChange={content =>
						setFormData({ ...formData, description: content })
					}
				/>
			</div>

			<pre>{JSON.stringify(formData, null, 2)}</pre>

			<button className='btn' onClick={handleSubmit}>
				mentés
			</button>
		</div>
	)
}

export const action = async ({ request, params }: Route.ActionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })

	if (!session) {
		throw new Response('Unauthorized', { status: 401 })
	}

	// read the sent data as json
	const formData = (await request.json()) as typeof event.$inferSelect

	console.log(formData)

	// if we dont have an id in params, create new
	if (!params.eventUrl) {
		// generate an url for the event
		const url = `${formData.startDate}-` + generateUrlName(formData.title)

		const result = await drizzleClient
			.insert(event)
			.values({
				...formData,
				url,
				createdBy: session.user.id
			})
			.returning({ id: event.id, url: event.url })

		if (result.length == 0) {
			throw new Response('Failed to create event', { status: 500 })
		}

		return redirect('/event/' + result[0].url + '/edit')
	} else {
	}

	return {}
}
