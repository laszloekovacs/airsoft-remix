import { useEffect, useState } from 'react'
import { CommentSection } from '../components/comment-section'

export default function SSEPage() {
	const [messages, setMessages] = useState<string[]>([])

	useEffect(() => {
		const eventSource = new EventSource('/sse')

		eventSource.onmessage = event => {
			setMessages(prevMessages => [...prevMessages, event.data])
		}

		eventSource.onerror = event => {
			console.error('EventSource error:', event)
		}

		return () => {
			eventSource.close()
		}
	}, [])

	return (
		<div>
			<h1>SSE</h1>

			{messages.map((message, index) => (
				<p key={index}>{message}</p>
			))}
		</div>
	)
}
