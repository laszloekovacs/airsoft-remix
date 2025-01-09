import React, { useEffect } from 'react'
import { Form, redirect, useActionData } from 'react-router'
import type { Route } from './+types/dashboard.post'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default function PostPage({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<h2>Új esemény</h2>

			<UploadForm />
		</div>
	)
}

const UploadForm = () => {
	const [file, setFile] = React.useState<File | null>(null)
	const [fileUrl, setFileUrl] = React.useState<string | null>(null)
	const [presignedUrl, setPresignedUrl] = React.useState<string | null>(null)

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

		if (!file) {
			return
		}

		setFile(file)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		// request a presigned url
		const response = await fetch('/dashboard/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fileName: file!.name,
				fileType: file!.type
			})
		})
		if (!response.ok) {
			console.error('Failed to get presigned url')
			return
		}

		const { presignedUrl } = await response.json()
		console.log('received presigned key: ' + presignedUrl)
		// set presigned key
		setPresignedUrl(presignedUrl)
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
				onSubmit={handleSubmit}
				method='post'
				encType='multipart/form-data'
				onChange={handleChange}>
				<input type='file' name='file' />
				<input type='text' name='title' placeholder='Esemény neve' required />
				<button type='submit'>Feltöltés</button>
			</Form>
		</div>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const { fileName, fileType } = await request.json()

	// configure s3 client
	const s3 = new S3Client({
		region: 'europe',
		endpoint: process.env.S3_ENDPOINT!,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY!,
			secretAccessKey: process.env.S3_SECRET!
		}
	})

	const bucketName = process.env.S3_BUCKET!
	const objectKey = `accounts/user/year/${fileName}`

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

export const loader = async ({ request }: Route.LoaderArgs) => {
	return { status: 200, message: 'ok' }
}

//https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
