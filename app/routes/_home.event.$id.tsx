import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '~/lib/supabase.server'
import { OutletContext } from '~/root'
import { Database } from '~/supabase'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)

	// query the event details
	const { data: event, error } = await supabase
		.from('events')
		.select('*')
		.eq('id', params.id!)
		.single()

	return json({ id: params.id, event }, { headers })
}

export default function EventDetailPage() {
	const { supabase } = useOutletContext<OutletContext>()
	const { id, event } = useLoaderData<typeof loader>()

	return (
		<div>
			<div>EventDetailPage for {id}</div>
			<pre>{JSON.stringify(event, null, 2)}</pre>
			<CommentSection supabase={supabase} id={id} />
		</div>
	)
}

export const CommentSection = ({
	supabase,
	id
}: {
	supabase: any
	id: any
}) => {
	const [comments, setComments] = useState<any>([])

	// query the comments for this event
	useEffect(() => {
		supabase
			.from('event_comments')
			.select('*')
			.eq('event_id', id)
			.then(({ data, error }) => {
				if (error) {
					console.error('Error querying comments', error)
				} else {
					setComments(data)
				}
			})
	}, [])

	return (
		<div>
			<h2>Comments</h2>
			<pre>{JSON.stringify(comments, null, 2)}</pre>
			<ul>
				{comments.map((comment: any) => (
					<li key={comment.id}>
						<CommentListItem
							comment={comment.comment}
							name={comment.author_id}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export const CommentListItem = ({
	comment,
	name
}: {
	comment: string
	name: string
}) => {
	return (
		<div>
			<p>{name}</p>
			<p>{comment}</p>
		</div>
	)
}
