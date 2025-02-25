import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { useFetcher } from 'react-router'
import { generateUrlName } from '~/helpers/generate-url-name'
import { useDebouncedValue } from '~/hools/useDebounceValue'
import { event } from '~/schema'
import { getSession } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.event.($eventUrl).edit._index'

type LoaderDataViewModel = {
	url: string
	title: string
	startDate: string
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = await getSession(request)
	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	// TODO: check if its the users event
	// use database index to identify event
	let result

	if (params.eventUrl) {
		result = await drizzleClient
			.select()
			.from(event)
			.where(eq(event.url, params.eventUrl))
	}

	const loaderData: LoaderDataViewModel = {
		url: params.eventUrl || '',
		title: (result && result[0].title) || '',
		startDate: (result && result[0].startDate) || ''
	}
	return loaderData
}

export default function EventEditIndexPage({
	loaderData
}: Route.ComponentProps) {
	const [url, setUrl] = useState(loaderData.url)
	const [title, setTitle] = useState(loaderData.title)
	const [startDate, setStartDate] = useState(loaderData.startDate)

	const fetcher = useFetcher()
	const debounced = useDebouncedValue(url, 300)

	const handleChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		/// check if theres a date set
		const formData = new FormData(e.target)
		formData.append('intent', 'VERIFY_EVENT_URL')
		await fetcher.submit(formData)
	}

	useEffect(() => {
		if (fetcher.data) {
			setUrl(fetcher.data.url)
		}
	}, [fetcher.data])

	return (
		<fetcher.Form method='post' onChange={handleChange}>
			<label htmlFor='title'>Esemény neve</label>

			<input
				id='title'
				type='text'
				name='title'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>

			<input
				id='date'
				type='date'
				name='startDate'
				value={startDate}
				onChange={e => setStartDate(e.target.value)}
			/>

			{fetcher.state === 'submitting' ? 'Submitting...' : ''}
			<p>{debounced}</p>
			<pre>{JSON.stringify(fetcher?.data, null, 2)}</pre>
		</fetcher.Form>
	)
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionCookie = await getSession(request)
	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	const formData = await request.formData()
	const title = formData.get('title') as string
	const startDate = formData.get('startDate')
	const intent = formData.get('intent')

	console.log(intent, title, startDate)

	const generatedUrl = startDate + '-' + generateUrlName(title)

	// check if it's not in use
	const result = await drizzleClient
		.select()
		.from(event)
		.where(eq(event.url, generatedUrl))

	return { url: generatedUrl, urlInUse: result.length > 0 ? true : false }
}
