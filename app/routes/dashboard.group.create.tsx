import { useEffect, useState } from 'react'
import { Form, useNavigate, useNavigation } from 'react-router'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { generateUrlName } from '~/lib/generate-url-name'
import { group } from '~/schema'
import type { Route } from './+types/dashboard.group.create'
import { delay } from '~/lib/delay'

export default function CreateGroupPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()
	const navigate = useNavigate()
	const [formState, setFormState] = useState({
		groupName: ''
	})

	// navigating or group successfully created
	const isPending = navigation.state != 'idle' || actionData?.isCreated

	useEffect(() => {
		if (actionData?.isCreated) {
			setFormState({
				groupName: ''
			})

			const timeoutHandle = setTimeout(() => {
				navigate(`/dashboard/group/${actionData.generatedName}`)
			}, 2000)

			return () => clearTimeout(timeoutHandle)
		}
	}, [actionData])

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
				<input type='submit' value='létrehoz' disabled={isPending} />
				<input type='reset' value='mégsem' disabled={isPending} />
			</Form>

			<div>
				{actionData?.isCreated && (
					<p className='text-green-600'>Sikeresen letrehozva</p>
				)}
			</div>

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
	const groupName = Object.fromEntries(formData).groupName.toString()
	if (groupName.length < 3) throw new Error('Group name too short')

	const generatedName = generateUrlName(groupName)

	delay(1000)

	// create the group, dont throw if it already exists
	const queryResult = await db
		.insert(group)
		.values({
			name: groupName,
			urlPath: generatedName,
			createdBy: sessionData.user.id
		})
		.onConflictDoNothing()

	if (queryResult.rowCount === 0) {
		throw new Error('Could not create, Group already exists')
	}

	return { isCreated: true, generatedName }
}
