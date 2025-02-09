import type { Route } from './+types/sse'
import { useEffect, useState } from 'react'

export const loader = ({ request }: Route.LoaderArgs) => {
	const stream = new ReadableStream({
		start(controller) {
			const interval = setInterval(() => {
				const data = `data: ${Date.now()}\n\n`
				controller.enqueue(data)
			}, 1000)

			request.signal.addEventListener('abort', () => {
				clearInterval(interval)
				controller.close()
			})
		}
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	})
}
