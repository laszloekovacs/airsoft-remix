import React from 'react'
import { auth } from '~/lib/auth.server'
import type { Route } from './+types/_home.user.group.create'
import invariant from 'tiny-invariant'
import { Form } from 'react-router'
import { db } from '~/lib/db.server'
import { group } from '~/schema'
import { redirect } from 'react-router'
import { eq } from 'drizzle-orm'

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

	const formData = await request.formData()
	const groupname = formData.get('groupname') as string

	// check if the group already exists in the database
	const groupExists = await db
		.select()
		.from(group)
		.where(eq(group.name, groupname))

	if (groupExists.length > 0) {
		return { status: 'error', message: 'mar letezik ilyen csoport' }
	}

	/// create a group in the database
	await db.insert(group).values({
		name: groupname
	})
	return redirect('/user')
}
