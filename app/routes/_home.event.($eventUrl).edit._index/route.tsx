import { useDeferredValue, useEffect, useState } from 'react'
import { useFetcher } from 'react-router'
import type { Route } from './+types/route'
import { action } from './action'
import { loader } from './loader'
import { PreviewUrl } from './PreviewUrl'

export { action, loader }

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
