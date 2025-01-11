import React, { useEffect } from 'react'
import { Form } from 'react-router'
import type { Route } from './+types/dashboard.post'

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
			<h2>Uj esemény</h2>
			<div>
				{fileUrl && (
					<img src={fileUrl} alt='Kép' style={{ maxWidth: '100%' }} />
				)}
			</div>
			<Form method='post' encType='multipart/form-data' onChange={handleChange}>
				<input type='file' name='file' accept='image/jpeg' required />
				<input type='text' name='title' placeholder='Esemény neve' required />
				<button type='submit'>Feltöltés</button>
			</Form>
		</div>
	)
}
