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

	// no session data, return to login page
	if (!sessionData) {
		return redirect('/login')
	}

	const formData = await request.formData()
	const groupname = formData.get('groupname') as string

	/// create a group in the database
	const result = await db.insert(group).values({
		url: generateUrlName(groupname),
		name: groupname
	})

	if (result.rowCount !== 1)
		throw new Error('database error: could not create group')

	return redirect('/user')
}

function generateUrlName(title: string) {
	// lower case
	// remove accents and special characters
	// replace spaces with hyphens
	// remove non-alphanumeric characters
	const url = title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')

	return url
}
