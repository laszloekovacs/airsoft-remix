import path from 'node:path'
import fs from 'node:fs/promises'
import React, { useEffect } from 'react'
import { Form, redirect } from 'react-router'
import { auth } from '~/lib/auth.server'
import type { Route } from './+types/dashboard.post'

export default function PostPage() {
	return (
		<div>
			<h2>Új esemény</h2>

			<FileSelector />
		</div>
	)
}

const FileSelector = () => {
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
		const file = target.files?.[0]
		console.log(file?.name)
		if (!file) {
			return
		}

		setFile(file)
	}

	return (
		<div>
			<div>
				{fileUrl && (
					<img src={fileUrl} alt='Kép' style={{ maxWidth: '100%' }} />
				)}
			</div>
			<Form method='post' encType='multipart/form-data' onChange={handleChange}>
				<input type='file' name='file' />
				<input type='text' name='title' placeholder='Esemény neve' required />
				<button type='submit'>Feltöltés</button>
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const session = await auth.api.getSession(request)
	const form = await request.formData()
	const file = form.get('file') as File

	const username = session?.user?.name

	// the path to the post will be: /uploads/year/user/filename.ext
	const filepath = `/uploads/${new Date().getFullYear()}/${username}/${
		file.name
	}`

	// save the file to the server with node fs
	const buffer = await file.arrayBuffer()
	await fs.writeFile(path.join(__dirname, filepath), Buffer.from(buffer))

	return redirect('/dashboard')
}
