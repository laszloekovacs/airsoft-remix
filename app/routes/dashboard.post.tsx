import React, { useEffect } from 'react'
import { Form } from 'react-router'

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
			<Form
				action='/api/upload'
				method='post'
				encType='multipart/form-data'
				onChange={handleChange}>
				<input type='file' name='file' />
				<input type='text' name='title' placeholder='Esemény neve' />
				<button type='submit'>Feltöltés</button>
			</Form>
		</div>
	)
}
