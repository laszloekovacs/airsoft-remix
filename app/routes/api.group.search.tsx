import type { ActionFunctionArgs } from 'react-router'
import { db } from '~/lib/db.server'
import { group } from '~/schema'
import { like } from 'drizzle-orm'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const groupName = formData.get('groupName')?.toString() ?? null

	if (!groupName)
		return {
			matches: []
		}

	console.log(groupName)

	// search for the group name
	const matches = await db
		.select()
		.from(group)
		.where(like(group.name, `${groupName}%`))

	return { matches }
}
