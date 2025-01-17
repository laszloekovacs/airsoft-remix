import { data, Form } from 'react-router'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { generateUrlName } from '~/lib/generate-url-name'
import { group } from '~/schema'
import type { Route } from './+types/dashboard.group.create'

export default function CreateGroupPage({ actionData }: Route.ComponentProps) {
	return (
		<div>
			<p>új csoport létrehozása</p>

			<Form method='POST'>
				<input
					type='text'
					name='groupName'
					required
					placeholder='pl: városi airsoft csoport'
				/>
				<input type='submit' value='létrehoz' />
				<input type='reset' value='mégsem' />
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionData = await auth.api.getSession({ headers: request.headers })
	if (!sessionData) throw new Response(null, { status: 401 })

	// check permission
	//if (sessionData.claims.)

	const formData = await request.formData()
	const groupName = formData.get('groupName')?.toString()
	if (!groupName) throw new Error('no group name')

	const generatedName = generateUrlName(groupName)

	const queryResult = await db
		.insert(group)
		.values({
			name: groupName,
			urlPath: generatedName,
			createdBy: sessionData.user.id
		})
		.onConflictDoNothing()

	if (queryResult.rowCount === 0) {
		return data(null, { status: 400 })
	}

	return data({ groupUrlPath: generatedName }, { status: 201 })
}
