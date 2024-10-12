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

	// if the user has a user.newuser set, return to home
	if (user.isnew == false) return redirect('/')

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
					<input
						type='name'
						name='name'
						defaultValue={user.name}
						required></input>
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
	const session = await getSession(request.headers.get('Cookie'))

	const formData = await request.formData()

	const name = formData.get('name') as string
	const email = session.data.user.email
	const avatar_url = session.data.user.avatar_url

	// record the new user in the database
	const result = await db.insert(users).values({ name, email, avatar_url }) // error: cannot insert null into column "name"
	// this is because the `name` property is missing in the `users` table
	// we need to specify the column name explicitly
	// also, we need to trim the input to remove any leading/trailing whitespace

	return redirect('/')
}
