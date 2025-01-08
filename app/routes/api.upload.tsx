import { redirect } from 'react-router'
import type { Route } from './+types/api.upload'

export const action = async ({ request }: Route.ActionArgs) => {
	const form = await request.formData()
	const file = form.get('file') as File

	console.log(file?.name)

	return redirect('/dashboard')
}
