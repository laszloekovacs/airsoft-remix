import type { ActionFunctionArgs } from 'react-router'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	return { status: 'ok' }
}
