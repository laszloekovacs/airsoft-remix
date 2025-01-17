import { useEffect, useState } from 'react'
import { Form, useNavigate, useNavigation } from 'react-router'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { generateUrlName } from '~/lib/generate-url-name'
import { group } from '~/schema'
import type { Route } from './+types/dashboard.group.create'

const MIN_GROUP_NAME_LENGTH = 3
const MAX_GROUP_NAME_LENGTH = 256
const REDIRECT_TIMEOUT = 5000

export default function CreateGroupPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()
	const navigate = useNavigate()
	const [formState, setFormState] = useState<{ groupName: string }>({
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
				navigate(`/dashboard/group/${actionData.generatedName}`, {
					replace: true
				})
			}, REDIRECT_TIMEOUT)

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
					aria-label='Csoport neve'
					type='text'
					name='groupName'
					required
					min={MIN_GROUP_NAME_LENGTH}
					max={MAX_GROUP_NAME_LENGTH}
					autoFocus
					placeholder='pl: városi airsoft csoport'
					value={formState.groupName}
					onChange={groupNameChangeHandler}
				/>
				<input type='submit' value='létrehoz' disabled={isPending} />
				<input type='reset' value='mégsem' disabled={isPending} />
			</Form>

			<div>
				{actionData?.isCreated && (
					<p className='text-green-600'>
						<span>Sikeresen letrehozva, atiranyitjuk {5} masodperc mulva</span>
					</p>
				)}
				{actionData?.error && (
					<p className='text-red-600'>{actionData.error}</p>
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

	if (groupName.length < MIN_GROUP_NAME_LENGTH)
		return {
			isCreated: false,
			error: 'A csoport neve minimum 3 karakter kell hogy legyen'
		}

	if (groupName.length > MAX_GROUP_NAME_LENGTH)
		return {
			isCreated: false,
			error: 'A csoport neve maximum 256 karakter lehet'
		}

	const generatedName = generateUrlName(groupName)

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
		return {
			isCreated: false,
			error: 'A csoport már létezik'
		}
	}

	return { isCreated: true, generatedName }
}
