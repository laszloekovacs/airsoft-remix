import React from 'react'
import { auth } from '~/lib/auth.server'
import type { Route } from './+types/_home.user.group.create'
import invariant from 'tiny-invariant'
import { Form } from 'react-router'
import { db } from '~/lib/db.server'
import { group } from '~/schema'
import { redirect } from 'react-router'

export default function GroupCreate() {
	return (
		<div>
			<p>új csoport létrehozása</p>

			<Form method='post'>
				<input
					type='text'
					name='groupname'
					required
					placeholder='csoport neve'
				/>
				<input type='submit' />
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionData = await auth.api.getSession({ headers: request.headers })
	invariant(sessionData, 'no session data')

	const formData = await request.formData()
	const groupname = formData.get('groupname') as string
	invariant(groupname, 'no groupname')

	/// create a group in the database
	await db.insert(group).values({
		name: groupname
	})

	console.log('group created')

	return redirect('/user')
}
