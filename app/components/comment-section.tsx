import { useState } from 'react'

type CommentType = {
	id: string
	threadId: string
	authorId: string
	content: string
	postedAt: string
}

type SubmitFn = ({
	authorId,
	threadId,
	content
}: {
	authorId: string
	threadId: string
	content: string
}) => Promise<void>

const CommentList = ({ comments }: { comments: CommentType[] }) => {
	if (!comments.length) {
		return <p>nincs hozzászolás</p>
	}

	return (
		<ul>
			{comments.map(comment => (
				<CommentListItem key={comment.id} comment={comment} />
			))}
		</ul>
	)
}

const CommentListItem = ({ comment }: { comment: CommentType }) => {
	return (
		<li className='flex flex-row gap-2'>
			<p>{comment.id}</p>
			<p className='underline'>{comment.postedAt}</p>
			<p className='font-bold'>{comment.authorId}</p>
			<p>{comment.content}</p>
		</li>
	)
}

const CommentForm = ({
	onPost,
	authorId,
	threadId,
	defaultValue
}: {
	onPost: SubmitFn
	authorId: string
	threadId: string
	defaultValue?: string
}) => {
	const [text, setText] = useState<string>(defaultValue || '')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await onPost({
			authorId,
			threadId,
			content: text
		})

		setText('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<textarea value={text} onChange={e => setText(e.target.value)} />
			<input type='submit' value='post' />
		</form>
	)
}

const data = [
	{
		threadId: '1',
		id: '1',
		authorId: 'mike',
		content: 'comment from mike',
		postedAt: new Date().toString()
	},
	{
		threadId: '1',
		id: '2',
		authorId: 'jane',
		content: 'hello from jane',
		postedAt: new Date().toString()
	}
]

export const CommentSection = ({
	threadId,
	authorId
}: {
	threadId: string
	authorId: string
}) => {
	const handlePost = async ({ authorId, threadId, content }) => {
		console.log(authorId, threadId, content)
	}

	return (
		<div>
			<h2>Hozzászolások</h2>

			<CommentForm
				authorId={authorId}
				threadId={threadId}
				onPost={handlePost}
			/>
			<CommentList comments={data} />
		</div>
	)
}
