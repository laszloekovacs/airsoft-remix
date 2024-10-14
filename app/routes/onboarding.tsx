import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect
} from '@remix-run/node'
import {
	json,
	useFetcher,
	useLoaderData,
	useNavigation
} from '@remix-run/react'
import { eq } from 'drizzle-orm'
import React, { useState } from 'react'
import { users } from '~/schema/schema.server'
import { db } from '~/services/drizzle.server'
import { destroySession, getSession } from '~/services/session.server'

const MIN_NAME_LENGTH = 5

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'))
	const user = session.get('user')

	// user isn't signing in, or is already registered redirect to home
	if (!user) {
		throw new Error('no session found', { cause: 401 })
	}

	// registered user, redirect to home
	if (user.id) {
		throw redirect('/')
	}

	// delete the session, but return the partial user
	const headers = {
		'Set-Cookie': await destroySession(session)
	}

	return json({ user }, { headers })
}

export default function Onboarding() {
	const { user } = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()
	const pending = fetcher.state !== 'idle'

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
					<fieldset disabled={pending}>
						<input type='hidden' name='email' value={user.email} />
						<input type='hidden' name='avatar_url' value={user.avatar_url} />

						<label htmlFor='name'>felhasználónév</label>
						<input
							type='name'
							name='name'
							defaultValue={user.name}
							required
							minLength={MIN_NAME_LENGTH}
						/>
						{fetcher.data?.status == 'name_taken_error' && (
							<div className='text-red-500'>{fetcher.data.message}</div>
						)}

						{fetcher.data?.status == 'min_length_error' && (
							<div className='text-red-500'>
								a felhasznalonev rövidebb mint 5 karakter
							</div>
						)}

						<button type='submit'>regisztrálok</button>

						<label htmlFor='accept'>
							elfogadom a felhasznalasi feteteleket
						</label>
						<input name='accept' type='checkbox' />
					</fieldset>
				</div>
			</fetcher.Form>

			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	/*	

	const {
		data: { user }
	} = await getSession(request.headers.get('Cookie'))
*/
	// shouldn't happen tho since we check for user in the loader
	// still posible to POST here
	//	if (!user) throw redirect('/')

	const formData = await request.formData()

	const name = formData.get('name') as string
	const email = formData.get('email') as string
	const avatar_url = formData.get('avatar_url') as string

	// name too short
	if (name.length < MIN_NAME_LENGTH) {
		return json({
			message: 'a felhasznalo neve rövidebb mint 5 karakter',
			status: 'min_length_error'
		})
	}

	// check if the userame is taken
	const existing = await db
		.select({ name: users.name })
		.from(users)
		.where(eq(users.name, name))

	if (existing.length > 0) {
		return json({
			message: 'a felhasználonév foglalt!',
			status: 'name_taken_error'
		})
	}

	// record the new user in the database, go home
	await db.insert(users).values({ name, email, avatar_url })
	return redirect('/')

	// success
	return json({ message: 'sikeres regisztráció', status: 'ok' })
}
