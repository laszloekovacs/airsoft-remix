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
	return redirect('/')
}
