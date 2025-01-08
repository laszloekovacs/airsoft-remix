import React, { useEffect } from 'react'
import { Form, redirect } from 'react-router'
//import { auth } from '~/lib/auth.server'
import type { Route } from './+types/dashboard.post'
import { parseFormData, FileUpload } from '@mjackson/form-data-parser'
import { LocalFileStorage } from '@mjackson/file-storage/local'

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
	//const session = await auth.api.getSession(request)
	//const username = session?.user?.name || 'guest'

	const uploadHandler = async (fileUpload: FileUpload) => {
		const fileStorage = new LocalFileStorage('./upload/content')

		const key = './upload/file.webp'

		await fileStorage.set(key, fileUpload)
		return fileStorage.get(key)
	}

	const formData = await parseFormData(request, uploadHandler)
	// do something with the form data
	return redirect('/dashboard')
}
