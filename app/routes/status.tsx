import { CommentSection } from '../components/comment-section'

export default function TestingPage() {
	return (
		<div>
			<p>teszteles</p>

			<CommentSection threadId='1' authorId='mike' />
		</div>
	)
}
