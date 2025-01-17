import type { ActionFunctionArgs } from 'react-router'
import { data } from 'react-router'

export const action = async ({ request }: ActionFunctionArgs) => {
	return data({ status: 'most komolyan?' }, { status: 200 })
}
