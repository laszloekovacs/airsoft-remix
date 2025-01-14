import { user } from '~/schema/auth-schema'
import type { Route } from './+types/status'
import { db } from '~/lib/db.server'

export const loader = async () => {
	try {
		if (!process.env.GITHUB_CLIENT_ID) {
			throw new Error('GITHUB_CLIENT_ID is not defined')
		}

		if (!process.env.GITHUB_CLIENT_SECRET) {
			throw new Error('GITHUB_CLIENT_SECRET is not defined')
		}

		if (!process.env.BETTER_AUTH_SECRET) {
			throw new Error('BETTER_AUTH_SECRET is not defined')
		}

		if (!process.env.BETTER_AUTH_URL) {
			throw new Error('BETTER_AUTH_URL is not defined')
		}

		if (!process.env.BASE_URL) {
			throw new Error('BASE_URL is not defined')
		}

		// try to do a select
		const result = await db.select().from(user).limit(1)

		if (result.length === 0) {
			throw new Error('database error: could not find any users')
		}
	} catch (error) {
		console.error(error)
		if (error instanceof Error) {
			return { status: 'error', message: error.message }
		}

		return { status: 'error', message: 'Unknown error in /status.tsx' }
	}

	return { status: 'ok', message: 'everyting seems to be ok' }
}

const StatusPage = ({ loaderData }: Route.ComponentProps) => {
	return (
		<div>
			<h1>{loaderData.status}</h1>
			<p>{loaderData.message}</p>
		</div>
	)
}

export default StatusPage
