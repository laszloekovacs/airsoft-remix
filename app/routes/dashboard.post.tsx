import React, { useEffect } from 'react'
import { Form } from 'react-router'
import type { Route } from './+types/dashboard.post'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const loader = async ({ request }: Route.LoaderArgs) => {
	// configure s3 client
	const s3 = new S3Client({
		region: process.env.S3_REGION!,
		endpoint: process.env.S3_ENDPOINT!,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY!,
			secretAccessKey: process.env.S3_SECRET!
		}
	})

	const bucketName = process.env.S3_BUCKET!
	const objectKey = `/user/tu.jpg`
	const fileType = 'image/jpeg'

	// create upload command
	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: objectKey,
		ContentType: fileType
	})
	const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 60 })
	console.log('created presigned key: ' + presignedUrl)

	return { presignedUrl }
}

export const action = async ({ request }: Route.ActionArgs) => {}

export default function PostPage({ loaderData }: Route.ComponentProps) {
	const { presignedUrl } = loaderData

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

		if (file) {
			setFile(file)
		}
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		if (!file) {
			return
		}

		const formData = new FormData(event.target as HTMLFormElement)
		formData.append('file', file)

		const uploadResponse = await fetch(presignedUrl!, {
			method: 'PUT',
			body: file,
			headers: {
				'Content-Type': 'image/jpeg',
				Origin: 'http://localhost:3000'
			}
		})

		if (uploadResponse.ok) {
			console.log('Uploaded successfully')
		} else {
			console.error('Upload failed')
		}
	}

	return (
		<div>
			{presignedUrl && <span>{presignedUrl}</span>}
			<div>
				{fileUrl && (
					<img src={fileUrl} alt='Kép' style={{ maxWidth: '100%' }} />
				)}
			</div>
			<Form
				method='post'
				encType='multipart/form-data'
				onChange={handleChange}
				onSubmit={handleSubmit}>
				<input type='file' name='file' accept='image/jpeg' />
				<input type='text' name='title' placeholder='Esemény neve' required />
				<button type='submit'>Feltöltés</button>
			</Form>
		</div>
	)
}

//https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
