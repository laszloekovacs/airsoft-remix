// comment section encompasses the data, comments and the form for posting

const commentData = {
	threadId: 1,
	comments: [
		{
			id: 1,
			authorId: 'mike',
			content: 'comment from mike'
		},
		{
			id: 2,
			authorId: 'jane',
			content: 'hello from jane'
		}
	]
}

const CommentList = ({
	comments
}: {
	comments: typeof commentData.comments
}) => {
	return (
		<div>
			{comments.map(comment => (
				<CommentListItem key={comment.id} comment={comment} />
			))}
		</div>
	)
}

// rendering comments
const CommentListItem = ({
	comment
}: {
	comment: (typeof commentData.comments)[0]
}) => {
	return (
		<div className='flex flex-row gap-2'>
			<p className='font-bold'>{comment.authorId}</p>
			<p>{comment.content}</p>
			<button>válasz</button>
		</div>
	)
}

const CommentSection = ({ data }: { data: typeof commentData }) => {
	return (
		<div>
			<CommentList comments={data.comments} />
		</div>
	)
}

export default function TestingPage() {
	return (
		<div>
			<p>teszteles</p>
			<CommentSection data={commentData} />
		</div>
	)
}
