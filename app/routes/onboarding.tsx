import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect
} from '@remix-run/node'
import { Form, json, useLoaderData } from '@remix-run/react'
import { getSession } from 'services/session.server'
import { db } from 'services/drizzle.server'
import { users } from 'schema/schema.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const {
		data: { user }
	} = await getSession(request.headers.get('Cookie'))

	console.log('session', user)

	// not signing up or already registered
	if (!user || user.id) {
		return redirect('/')
	}

	return json({ user })
}

export default function Onboarding() {
	const { user } = useLoaderData<typeof loader>()

	return <p>hello {JSON.stringify(user, null, 2)}</p>

	return (
		<div>
			<div>Onboarding</div>

			<img src={newuser.avatar_url} alt={newuser.name} width={45}></img>

			<output>{newuser.name}</output>

			<Form method='post'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='name'>felhasználónév</label>
					<input type='name' name='name' defaultValue={newuser.name} required />
					<button type='submit'>regisztrálok</button>

					<label htmlFor='accept'>elfogadom a felhasznalasi feteteleket</label>
					<input name='accept' type='checkbox' />
				</div>
			</Form>

			<pre>{JSON.stringify(newuser, null, 2)}</pre>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const { data } = await getSession(request.headers.get('Cookie'))

	const formData = await request.formData()

	const name = formData.get('name') as string
	const email = data.user.newuser.email
	const avatar_url = data.user.newuser.avatar_url

	// record the new user in the database
	const result = await db.insert(users).values({ name, email, avatar_url }) // error: cannot insert null into column "name"
	// this is because the `name` property is missing in the `users` table
	// we need to specify the column name explicitly
	// also, we need to trim the input to remove any leading/trailing whitespace

	return redirect('/')
}
