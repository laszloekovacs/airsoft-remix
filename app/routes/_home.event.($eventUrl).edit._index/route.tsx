import { eq } from 'drizzle-orm'
import { useDeferredValue, useEffect, useState } from 'react'
import { redirect, useFetcher } from 'react-router'
import { generateUrlName as generateUrlSafeName } from '~/helpers/generate-url-name'
import { event } from '~/schema'
import { getSession } from '~/services/auth.server'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/route'

type LoaderDataViewModel = {
	id: string
	url: string
	title: string
	startDate: string
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const sessionCookie = await getSession(request)
	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	let result

	if (params.eventUrl) {
		result = await drizzleClient
			.select()
			.from(event)
			.where(eq(event.url, params.eventUrl))

		if (result.length == 0) {
			throw new Response('not found', { status: 404 })
		}

		if (result.length > 1) {
			throw new Response('url not unique', { status: 500 })
		}
	}

	const loaderData: LoaderDataViewModel = {
		id: result?.[0].id || '',
		url: params.eventUrl || '',
		title: result?.[0].title || '',
		startDate: result?.[0].startDate || ''
	}

	return loaderData
}

const PreviewUrl = ({
	fetcher,
	title,
	startDate
}: {
	fetcher: ReturnType<typeof useFetcher<typeof action>>
	title: string
	startDate: string
}) => {
	useEffect(() => {
		fetcher.submit(
			{ intent: 'verify', title, startDate },
			{ method: 'post', encType: 'application/json' }
		)
	}, [title, startDate])

	return <p>{fetcher?.data && JSON.stringify(fetcher?.data)}</p>
}

export default function EventEditIndexPage({
	loaderData
}: Route.ComponentProps) {
	const [title, setTitle] = useState(loaderData.title)
	const [startDate, setStartDate] = useState(loaderData.startDate)
	const fetcher = useFetcher<typeof action>()

	const deferredTitle = useDeferredValue(title)
	const deferredStartDate = useDeferredValue(startDate)

	const isPending = fetcher.state !== 'idle'

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (isPending) return

		const formData = {
			id: loaderData.id,
			title,
			startDate,
			intent: 'save'
		}

		// validate form
		if (!title || !startDate) return
		if (title.length < 3) return

		await fetcher.submit(formData, {
			method: 'post',
			encType: 'application/json'
		})
	}

	return (
		<fetcher.Form method='post' onSubmit={handleSubmit}>
			<label htmlFor='title'>Esemény neve</label>

			<input type='hidden' name='id' value={loaderData.id} />

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

			<PreviewUrl
				fetcher={fetcher}
				title={deferredTitle}
				startDate={deferredStartDate}
			/>

			<input type='submit' value='mentés' />
		</fetcher.Form>
	)
}

type ActionResultModel = {
	id: string
	url: string
	isAvailable: boolean
}

export const action = async ({ request }: Route.ActionArgs) => {
	const sessionCookie = await getSession(request)
	if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

	const formData = await request.json()
	const { id, title, startDate, intent } = formData

	const generatedUrl = startDate + '-' + generateUrlSafeName(title)
	let isAvaliable = false

	switch (intent) {
		case 'save': {
			const result = await drizzleClient
				.update(event)
				.set({
					title,
					startDate,
					url: generatedUrl
				})
				.where(eq(event.id, id))
				.returning({ id: event.id, url: event.url })

			return redirect(`/event/${result[0].url}/edit`)
		}

		case 'verify': {
			// check if it's not in use
			const result = await drizzleClient
				.select()
				.from(event)
				.where(eq(event.url, generatedUrl))

			// not found, or its the current event, safe to use
			if (result.length == 0 || result[0].id == id) {
				isAvaliable = true
			}

			const response: ActionResultModel = {
				id,
				url: generatedUrl,
				isAvailable: isAvaliable
			}

			return response
		}

		default:
			throw new Response('Bad intent', { status: 400 })
	}
}
