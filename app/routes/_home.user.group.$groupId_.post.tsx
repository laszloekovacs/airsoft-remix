import { Form, redirect } from 'react-router'
import type { Route } from './+types/_home.user.group.$groupId_.post'
import invariant from 'tiny-invariant'
import { db } from '~/lib/db.server'
import { post } from '~/schema'
import { auth } from '~/lib/auth.server'

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

	const { groupId } = params

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
	const base = './data/content'
	const year = new Date().getFullYear()
	const timestamp = Date.now()
	const ext = attachment.name.split('.').pop()

	const key = `${base}/${year}/${groupId}-${timestamp}.${ext}`

	console.log({
		key,
		title,
		attachment
	})

	// write file to disk
	await Bun.write(key, attachment)

	// record it in the database
	await db.insert(post).values({
		id: 'helldps',
		title: title,
		attachment: key,
		createdAt: new Date(),
		updatedAt: new Date(),
		groupId: params.groupId,
		userId: session.user.id
	})

	return redirect(`/user/group/${groupId}`)
}
