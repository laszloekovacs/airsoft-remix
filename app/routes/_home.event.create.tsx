import { Form } from 'react-router'
import type { Route } from './+types/_home.event.create'
import { redirect } from 'react-router'
import { drizzleClient } from '~/services/db.server'
import { event } from '~/schema'
import { auth } from '~/services/auth.server'

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

	console.log(title, startDate)

	const result = await drizzleClient
		.insert(event)
		.values({
			title,
			startDate,
			startTime: '1:00:00',
			url: '',
			createdBy: ''
		})
		.returning({ id: event.id })

	return redirect('/')
}
