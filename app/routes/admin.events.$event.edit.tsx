import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useLoaderData } from '@remix-run/react'
import { events } from '~/schema/schema.server'
import { db } from '~/services/drizzle.server'
import { getSession } from '~/services/session.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	return { event_id: params.event }
}

export default function EditPage() {
	// get url
	const { event_id } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Új esemény</h2>

			<Form method='post'>
				<div className='flex flex-col gap-2'>
					<input type='hidden' name='event_id' value={event_id} />

					<label htmlFor='title'>Esemeny neve</label>
					<input type='text' name='title' />

					<label htmlFor='text_plain'>Esemeny leiras</label>
					<textarea
						name='text_plain'
						cols={80}
						rows={10}
						placeholder='esemeny leirasa...'></textarea>

					<button type='submit'>Mentés es vissza</button>
				</div>
			</Form>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	// get the session and the user, TODO: authorize
	const session = await getSession(request.headers.get('Cookie'))

	const formData = await request.formData()
	const { event_id, title, text_plain } = Object.fromEntries(formData)
	const creator_id = session.data.user?.id

	if (!creator_id) {
		return json({
			message: 'nincs bejelentkezve',
			status: 'unauthorized'
		})
	}

	console.log([event_id, title, text_plain, creator_id])

	// try to save to db
	const result = await db
		.insert(events)
		.values({
			id: event_id.toString(),
			creator_id: creator_id.toString(),
			title: title.toString(),
			text_mdx: text_plain.toString()
		})
		.returning({ insertedId: events.id })

	if (result.length === 0) {
		return json({
			message: 'nem sikerult menteni',
			status: 'error'
		})
	}

	return redirect('/admin/events')
}
