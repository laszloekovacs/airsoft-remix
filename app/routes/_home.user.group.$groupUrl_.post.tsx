import { Form, redirect } from 'react-router'
import type { Route } from './+types/_home.user.group.$groupUrl_.post'
import invariant from 'tiny-invariant'
import { db } from '~/lib/db.server'
import { post, group } from '~/schema'
import { auth } from '~/lib/auth.server'
import { storage_write } from '~/lib/storage.server'
import { eq } from 'drizzle-orm'

export default function PostPage() {
	return (
		<div>
			<h2>új esemény létrehozása</h2>
			<Form method='POST' encType='multipart/form-data'>
				<input type='text' name='title' placeholder='esemény neve' required />

				<p>esemény plakátja</p>
				<input type='file' name='attachment' accept='image/jpeg' />
				<br />
				<input type='submit' value='létrehozás' />
				<button>submut</button>
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
	if (attachment.size > 2 * 1024 * 1024) {
		throw new Error('File too large, max 2mb is allowed')
	}

	// generate a template path for the attachment
	const year = new Date().getFullYear()
	const timestamp = Date.now()
	const ext = attachment.name.split('.').pop()

	const key = `${year}/${groupUrl}-${timestamp}.${ext}`
	console.log(key)

	// write file to disk
	const bytes = await storage_write(key, attachment)
	console.log(bytes)

	// lookup the groupId from the url
	const used_group = await db
		.select()
		.from(group)
		.where(eq(group.url, groupUrl))

	if (used_group.length !== 1) {
		throw new Error('Group not found')
	}

	const group_id = used_group[0].id

	// record it in the database
	await db.insert(post).values({
		title: title,
		attachment: key,
		userId: session.user.id,
		groupId: group_id
	})

	return redirect(`/user/group/${groupUrl}`)
}
