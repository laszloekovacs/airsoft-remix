import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { Form, redirect } from 'react-router'
import invariant from 'tiny-invariant'
import { auth } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { generateUrlName } from '~/lib/generate-url-name'
import { WriteToStorage } from '~/lib/storage.server'
import { event, group } from '~/schema'
import type { Route } from './+types/dashboard.group.$groupUrl_.post'

const MAX_ATTACHMENT_SIZE = 2 * 1024 * 1024

export default function PostAdInGroupPage() {
	const [file, setFile] = useState<File | null>(null)
	const [fileUrl, setFileUrl] = useState<string | null>(null)

	useEffect(() => {
		if (!file) {
			return
		}

		const fileUrl = URL.createObjectURL(file)
		setFileUrl(fileUrl)

		return () => {
			URL.revokeObjectURL(fileUrl)
		}
	}, [file])

	const handleFileSelected = async (event: React.FormEvent) => {
		const target = event.target as HTMLInputElement
		setFile(target.files?.[0] ?? null)
	}

	return (
		<div>
			<h2>új esemény létrehozása</h2>
			<div>
				<span>elonezet</span>
				{fileUrl && <img className='max-w-full' src={fileUrl} alt='elonezet' />}
			</div>

			<Form
				method='POST'
				encType='multipart/form-data'
				onChange={handleFileSelected}>
				<input type='text' name='title' placeholder='esemény neve' required />

				<p>esemény plakátja</p>
				<input type='file' name='attachment' accept='image/jpeg' />
				<br />
				<input type='submit' value='létrehozás' />
			</Form>
		</div>
	)
}

export const action = async ({ request, params }: Route.ActionArgs) => {
	const session = await auth.api.getSession({ headers: request.headers })
	invariant(session, 'no session data')

	const { groupUrl } = params

	const formData = await request.formData()
	invariant(formData, 'no form data')

	const title = formData.get('title') as string
	invariant(title, 'no title')

	const attachment = formData.get('attachment') as File
	invariant(attachment, 'no attachment')

	// reject large files
	if (attachment.size > MAX_ATTACHMENT_SIZE) {
		throw new Error('File too large, max 2mb is allowed')
	}

	// generate an url friendly title
	const titleUrl = generateUrlName(title)

	// generate a template path for the attachment
	const year = new Date().getFullYear()
	const hexTimestamp = Date.now().toString(16)
	const ext = attachment.name.split('.').pop()

	const key = `${year}/${groupUrl}_${titleUrl}_${hexTimestamp}.${ext}`

	// write file to disk
	const bytes = await WriteToStorage(key, attachment)

	if (bytes == 0) {
		throw new Error('Failed to write file to disk')
	}

	// lookup the groups Id from the url
	const current_group = await db
		.select()
		.from(group)
		.where(eq(group.urlPath, groupUrl))

	if (current_group.length !== 1) {
		throw new Error('Group not found')
	}

	const group_id = current_group[0].id

	// record it in the database
	await db.insert(event).values({
		title,
		location: '',
		description: '',
		startDate: new Date(),
		startTime: new Date(),
		urlPath: titleUrl,
		attachment: key,
		userId: session.user.id,
		groupId: group_id,
		createdBy: session.user.id,
		group: group_id
	})

	return redirect(`/dashboard/group/${groupUrl}/${titleUrl}`)
}
