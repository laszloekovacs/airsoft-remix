import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect
} from '@remix-run/node'
import { Form, json, useLoaderData } from '@remix-run/react'
import { getSession } from 'services/session.server'
import { db } from 'services/drizzle.server'
import { users } from 'schema/schema.server'
import { eq } from 'drizzle-orm'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const {
		data: { user }
	} = await getSession(request.headers.get('Cookie'))

	// user isn't signing in, or is already registered redirect to home
	if (!user || user.id) {
		return redirect('/')
	}

	return json({ user })
}

export default function Onboarding() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<div>Onboarding</div>

			<img src={user.avatar_url} alt={user.name} width={45}></img>

			<output>{user.name}</output>

			<Form method='post'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='name'>felhasználónév</label>
					<input type='name' name='name' defaultValue={user.name} required />
					<button type='submit'>regisztrálok</button>

					<label htmlFor='accept'>elfogadom a felhasznalasi feteteleket</label>
					<input name='accept' type='checkbox' />
				</div>
			</Form>

			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const {
		data: { user }
	} = await getSession(request.headers.get('Cookie'))

	// shouldn't happen tho since we check for user in the loader
	// still posible to POST here
	if (!user) throw redirect('/')

	const formData = await request.formData()

	const name = formData.get('name') as string
	const email = user.email
	const avatar_url = user.avatar_url

	// check if the userame is avalable
	const existing = await db
		.select({ name: users.name })
		.from(users)
		.where(eq(users.name, name))

	if (existing.length > 0) {
		return json({ message: 'user already exists' }, { status: 409 })
	}

	// record the new user in the database
	await db.insert(users).values({ name, email, avatar_url })

	return redirect('/')
}
