import { Form, redirect } from 'react-router'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { generateUrlName } from '~/lib/generate-url-name'
import { group } from '~/schema'
import type { Route } from './+types/dashboard.group.create'

export default function GroupCreate() {
	return (
		<div>
			<p>új csoport létrehozása</p>

			<Form method='post'>
				<input
					type='text'
					name='groupName'
					required
					placeholder='pl: városi airsoft csoport'
				/>
				<input type='submit' value='létrehoz' />
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
	//Object.fromEntries(formData)
	const groupname = formData.get('groupName') as string

	/// create a group in the database
	const result = await db.insert(group).values({
		createdBy: sessionData.user.id,
		urlPath: generateUrlName(groupname),
		name: groupname
	})

	if (result.rowCount !== 1)
		throw new Error('database error: could not create group')

	return redirect('/user')
}
