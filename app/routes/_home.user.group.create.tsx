import { Form, redirect } from 'react-router'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { group } from '~/schema'
import type { Route } from './+types/_home.user.group.create'

export default function GroupCreate() {
	return (
		<div>
			<p>új csoport létrehozása</p>

			<Form method='post'>
				<input
					type='text'
					name='groupname'
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
	// 1. Remove accents and special characters
	const normalizedTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

	// 2. Replace spaces with hyphens
	const hyphenatedTitle = normalizedTitle.replace(/\s+/g, '-')

	// 3. Convert to lowercase
	const lowercaseTitle = hyphenatedTitle.toLowerCase()

	// 4. Remove non-alphanumeric characters
	const urlName = lowercaseTitle.replace(/[^a-z0-9-]/g, '')

	return urlName
}
