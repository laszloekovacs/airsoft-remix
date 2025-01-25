import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { Form, redirect } from 'react-router'
import invariant from 'tiny-invariant'
import { auth } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import { generateUrlName } from '~/services/generate-url-name'
import { writeToStorage } from '~/services/storage.server'
import { event, group } from '~/schema'
import type { Route } from './+types/dashboard.group.$groupUrl_.post'
import { encodeBase62 } from '~/services/base62'

const MAX_ATTACHMENT_SIZE = 1 * 1024 * 1024

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
		throw new Error(`File too large, max ${MAX_ATTACHMENT_SIZE} bytes allowed`)
	}

	// generate an url friendly title
	const titleUrl = generateUrlName(title)

	// generate a template path for the attachment
	const timestamp = Date.now()
	const year = new Date(timestamp).getFullYear()
	const encodedTimestamp = encodeBase62(timestamp)
	const ext = attachment.name.split('.').pop()

	const key = `${year}/${groupUrl}_${titleUrl}_${encodedTimestamp}.${ext}`

	// write file to disk
	const bytes = await writeToStorage(key, attachment)

	if (bytes == 0) {
		throw new Error('Failed to write file to disk')
	}

	// lookup the groups Id from the url
	const current_group = await drizzleClient
		.select()
		.from(group)
		.where(eq(group.urlPath, groupUrl))

	if (current_group.length !== 1) {
		throw new Error('Group not found')
	}

	const group_id = current_group[0].id

	// record it in the database
	await drizzleClient.insert(event).values({
		urlPath: titleUrl,
		title,
		description: '',
		attachment: key,
		startTime: '12:30',
		startDate: '2001-01-01',
		location: '',
		isPublished: false,
		createdBy: session.user.id,
		group: group_id
	})
	// TODO: create handler for this path
	return redirect(`/dashboard/group/${groupUrl}/${titleUrl}`)
}
