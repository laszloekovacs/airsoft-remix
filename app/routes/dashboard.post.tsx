import React, { useEffect } from 'react'
import { Form, redirect } from 'react-router'
import type { Route } from './+types/dashboard.post'
import { db } from '~/lib/db.server'
import { post } from '~/schema'
import { auth } from '~/lib/auth.server'
import invariant from 'tiny-invariant'

export default function PostPage({ loaderData }: Route.ComponentProps) {
	const [file, setFile] = React.useState<File | null>(null)
	const [fileUrl, setFileUrl] = React.useState<string | null>(null)

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

	const handleChange = async (event: React.FormEvent) => {
		const target = event.target as HTMLInputElement
		setFile(target.files?.[0] ?? null)
	}

	return (
		<div>
			<h2>új esemény</h2>
			<div>
				{fileUrl && <img className='max-w-full' src={fileUrl} alt='Kép' />}
			</div>
			<Form method='post' encType='multipart/form-data' onChange={handleChange}>
				<input type='file' name='attachment' accept='image/jpeg' required />
				<input type='text' name='title' placeholder='Esemény neve' required />
				<button type='submit'>Feltöltés</button>
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionData = await auth.api.getSession({ headers: request.headers })
	invariant(sessionData, 'no session data')
	const { session } = sessionData

	const formData = await request.formData()
	const title = formData.get('title') as string
	const attachment = formData.get('attachment') as File

	invariant(title, 'no title')
	invariant(attachment, 'no attachment')

	// reject large files
	if (attachment.size > 2 * 1024 * 1024) {
		throw new Error('File too large, max 2mb is allowed')
	}

	const { userId } = session

	// generate filename, pattern: ./data/content/{year}/{userId}-{timestamp}.{ext}
	const base = './data/content'
	const key = `${base}/${new Date().getFullYear()}/${userId}-${Date.now()}.${attachment.name
		.split('.')
		.pop()}`

	// write file
	await Bun.write(key, attachment)

	// record it in the database
	await db.insert(post).values({
		title,
		attachment: key,
		createdAt: new Date(),
		updatedAt: new Date(),
		postedBy: userId
	})

	return redirect('/')
}
