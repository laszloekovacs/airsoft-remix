import { data, Form } from 'react-router'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { generateUrlName } from '~/lib/generate-url-name'
import { group } from '~/schema'
import type { Route } from './+types/dashboard.group.create'
import { useDeferredValue, useState } from 'react'
import { eq } from 'drizzle-orm'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)
	const query = url.searchParams.get('q')

	if (query) {
		const groups = await db.select().from(group).where(eq(group.name, query))

		return data({ query, groups })
	}

	return data({ query, groups: [] })
}

export default function CreateGroupPage({
	actionData,
	loaderData
}: Route.ComponentProps) {
	const { query, groups } = loaderData
	const [formState, setFormState] = useState({
		groupName: query || ''
	})

	const groupNameChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormState({
			...formState,
			groupName: event.target.value
		})
	}

	return (
		<div>
			<h2>új szervező csoport létrehozása</h2>

			<Form method='POST'>
				<input
					type='text'
					name='groupName'
					required
					placeholder='pl: városi airsoft csoport'
					value={formState.groupName}
					onChange={groupNameChangeHandler}
				/>
				<input type='submit' value='létrehoz' />
				<input type='reset' value='mégsem' />
			</Form>

			<div>
				{formState.groupName && (
					<p>
						<span>a csoport a</span>
						<span className='font-bold'>
							&nbsp;
							<span>www.airsoft-naptar.hu/group/</span>
							<span>{generateUrlName(formState.groupName)}</span>
							&nbsp;
						</span>
						<span>címen lessz elérhető</span>
					</p>
				)}
			</div>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionData = await auth.api.getSession({ headers: request.headers })
	if (!sessionData) throw new Response(null, { status: 401 })

	const formData = await request.formData()
	const groupName = formData.get('groupName')?.toString()
	if (!groupName) throw new Response(null, { status: 400 })

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
