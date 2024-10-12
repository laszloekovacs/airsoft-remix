import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect
} from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import React from 'react'
import { users } from 'schema/schema.server'
import { db } from 'services/drizzle.server'
import { getSession } from 'services/session.server'

const MIN_NAME_LENGTH = 5

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
	const fetcher = useFetcher<typeof action>()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		fetcher.submit(event.currentTarget)
	}

	return (
		<div>
			<div>Onboarding</div>

			<img src={user.avatar_url} alt={user.name} width={45}></img>

			<output>{user.name}</output>

			<fetcher.Form method='post' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-2'>
					<label htmlFor='name'>felhasználónév</label>
					<input
						type='name'
						name='name'
						defaultValue={user.name}
						required
						minLength={MIN_NAME_LENGTH}
					/>
					{fetcher.data?.status == 'name_taken' && (
						<div className='text-red-500'>{fetcher.data.message}</div>
					)}

					{fetcher.data?.status == 'min_length' && (
						<div className='text-red-500'>
							a felhasznalonev rövidebb mint 5 karakter
						</div>
					)}

					<button type='submit'>regisztrálok</button>

					<label htmlFor='accept'>elfogadom a felhasznalasi feteteleket</label>
					<input name='accept' type='checkbox' />
				</div>
			</fetcher.Form>

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

	// name too short
	if (name.length < MIN_NAME_LENGTH) {
		return json({
			message: 'a felhasznalo neve rövidebb mint 5 karakter',
			status: 'min_length'
		})
	}

	// check if the userame is avalable
	const existing = await db
		.select({ name: users.name })
		.from(users)
		.where(eq(users.name, name))

	if (existing.length > 0) {
		return json({ message: 'a felhasználonév foglalt!', status: 'name_taken' })
	}

	// record the new user in the database, go home
	await db.insert(users).values({ name, email, avatar_url })

	// success
	return json({ message: 'sikeres regisztráció', status: 'ok' })
}
