import { useEffect, useState } from 'react'
import { Form } from 'react-router'
import { drizzleClient } from '~/services/db.server'
import { user } from '~/schema/auth-schema'
import type { Route } from './+types/status'
import TimeTable from '~/components/time-table'
import PricingTable from '~/components/pricing-table'
import OrganizerTitleCard from '~/components/organizer-title-card'
import UserTable from '~/components/user-table'

export const loader = async () => {
	try {
		if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
			throw new Error('GITHUB_CLIENT_ID is not defined')
		}

		if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
			throw new Error('DISCORD_CLIENT_ID is not defined')
		}

		if (!process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) {
			throw new Error('BETTER_AUTH_SECRET is not defined')
		}

		if (!process.env.BASE_URL) {
			throw new Error('BASE_URL is not defined')
		}

		// try to do a select
		const result = await drizzleClient.select().from(user).limit(1)

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
	const [searchTerm, setSearchTerm] = useState('')
	const [data, setData] = useState('')

	useEffect(() => {
		if (searchTerm) {
			const form = new FormData()
			form.append('groupName', searchTerm)

			fetch('/api/group/search', {
				method: 'POST',
				body: form
			})
				.then(res => res.json())
				.then(data => setData(data))
		}
	}, [searchTerm])

	return (
		<div>
			<h1>{loaderData.status}</h1>
			<p>{loaderData.message}</p>
			{<pre>{JSON.stringify(data, null, 2)}</pre>}
			<Form action='/api/group/search' method='POST'>
				<label htmlFor='groupName'>Group name</label>
				<input
					type='text'
					name='groupName'
					id='groupName'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</Form>
			<p> something</p>
			<button popoverTarget='socials'>open</button>
			<div popover='auto' id='socials'>
				<p>the popover</p>
				<button popoverTarget='socials' popoverTargetAction='hide'>
					close
				</button>
			</div>
			<p>testing the styles</p>
			<dialog open>
				<p>Greetings, one and all!</p>
				<form method='dialog'>
					<button>OK</button>
				</form>
			</dialog>

			<TimeTable
				date='2021-10-10'
				times={[
					{ time: '10:00', label: 'kezdés' },
					{ time: '11:00', label: 'ebédidő' },
					{ time: '12:00', label: 'vége' }
				]}
			/>
			<PricingTable
				pricing={{
					prices: [
						{ price: 5000, label: 'beugró' },
						{ price: 3000, label: 'eszköz bérlés' }
					]
				}}
			/>

			<UserTable
				players={[
					{
						avatar: 'https://randomuser.me/api/portraits',
						callsign: 'johndoe',
						id: '1',
						group: '1'
					}
				]}
			/>
		</div>
	)
}

export default StatusPage
