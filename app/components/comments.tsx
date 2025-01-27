export type CommentType = {
	id: number
	user: string
	avatar: string
	text: string
	replies: CommentType[]
}

export default function CommentsContainer({
	comments
}: {
	comments: CommentType[]
}) {
	return (
		<div>
			<figcaption>Hozzászólások</figcaption>
			<CommentList comments={comments} />
		</div>
	)
}

const CommentList = ({ comments }: { comments: CommentType[] }) => {
	// If there are no comments, return null
	if (!comments.length) {
		return null
	}

	return (
		<div>
			{comments.map(comment => (
				<CommentListItem key={comment.id} comment={comment} />
			))}
		</div>
	)
}

const CommentListItem = ({ comment }: { comment: CommentType }) => {
	return (
		<div>
			<div>
				<img src={comment.avatar} alt={comment.user} />
				<p>{comment.user}</p>
			</div>
			<p>{comment.text}</p>
			{comment.replies && <CommentList comments={comment.replies} />}
		</div>
	)
}
