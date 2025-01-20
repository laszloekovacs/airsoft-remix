import { like } from 'drizzle-orm'
import type { ActionFunction, LoaderFunction } from 'react-router'
import { drizzleClient } from '~/lib/db.server'
import { group } from '~/schema'

export const action: ActionFunction = async ({ request }) => {
	const data = await request.formData()
	const groupName = data.get('groupName')

	console.log(groupName)

	const result = await drizzleClient
		.select()
		.from(group)
		.where(like(group.name, `${groupName}%`))

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	})
}
