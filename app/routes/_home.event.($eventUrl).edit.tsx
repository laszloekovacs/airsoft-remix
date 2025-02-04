import { eq } from 'drizzle-orm'
import { useState } from 'react'
import { useFetcher } from 'react-router'
import { event } from '~/schema'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.event.($eventUrl).edit'
import styles from './_home.event.($eventUrl).edit.module.css'

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

	if (!eventData || eventData.length === 0) {
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
		<div className={styles.formContainer}>
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

			<button className='btn' onClick={handleSubmit}>
				mentés
			</button>
		</div>
	)
}

export const action = async ({ request, params }: Route.ActionArgs) => {
	const formData = (await request.json()) as typeof event.$inferSelect
	console.log(formData)

	const updateData = {
		title: formData.title,
		startDate: formData.startDate,
		isPublished: formData.isPublished,
		updatedAt: new Date()
	} as typeof event.$inferInsert

	const result = await drizzleClient
		.insert(event)
		.values(formData)
		.onConflictDoUpdate({
			target: event.id,
			set: updateData
		})

	return {}
}
