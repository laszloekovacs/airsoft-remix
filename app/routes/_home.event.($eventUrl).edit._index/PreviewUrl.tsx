import { useEffect } from 'react'
import type { action } from './action'
import type { useFetcher } from 'react-router'

type PreviewProps = {
	fetcher: ReturnType<typeof useFetcher<typeof action>>
	title: string
	startDate: string
}

export const PreviewUrl = (props: PreviewProps) => {
	const { fetcher, title, startDate } = props

	useEffect(() => {
		fetcher.submit(
			{ intent: 'verify', title, startDate },
			{ method: 'post', encType: 'application/json' }
		)
	}, [title, startDate])

	return <p>{fetcher?.data && JSON.stringify(fetcher.data)}</p>
}
