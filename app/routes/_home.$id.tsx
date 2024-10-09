import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'
import { useEffect, useState } from 'react'
import { OutletContext } from '~/root'
import { Database } from '~/supabase'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const response = new Response()

	const supabase = createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get('Cookie') ?? '')
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						response.headers.append(
							'Set-Cookie',
							serializeCookieHeader(name, value, options)
						)
					})
				}
			}
		}
	)

	// query the event details
	const { data: event, error } = await supabase
		.from('events')
		.select('*')
		.eq('id', params.id!)
		.single()

	return { id: params.id, event }
}

export default function EventDetailPage() {
	const { supabase } = useOutletContext<OutletContext>()
	const { id, event } = useLoaderData<typeof loader>()

	return (
		<div>
			<div>EventDetailPage for {id}</div>
			<CommentSection supabase={supabase} id={id} />
		</div>
	)
}
//<pre>{JSON.stringify(event, null, 2)}</pre>

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
							text={comment.comment_text}
							name={comment.commenter_name}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export const CommentListItem = ({
	text,
	name
}: {
	text: string
	name: string
}) => {
	return (
		<div>
			<p>{name}</p>
			<p>{text}</p>
		</div>
	)
}
