import type { Route } from './+types/_home.user.group.$groupUrl_._index'
import { Link } from 'react-router'
import { db } from '~/lib/db.server'
import { post } from '~/schema'

type postType = typeof post.$inferSelect

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const posts = await db.select().from(post)

	return { groupUrl: params.groupUrl, posts }
}

export default function GroupDetailsPage({ loaderData }: Route.ComponentProps) {
	const { groupUrl, posts } = loaderData

	return (
		<div>
			<span>{groupUrl}</span>
			<h2>Csoport hirdetései</h2>

			<div>
				<PostsListContainer id={groupUrl} />
				<PostList posts={posts} groupUrl={groupUrl} />
			</div>
		</div>
	)
}

const PostsListContainer = ({ id }: { id: string }) => {
	return (
		<div>
			<Link to={`/user/group/${id}/post`}>new post</Link>
		</div>
	)
}

const PostList = ({
	posts,
	groupUrl
}: {
	posts: postType[]
	groupUrl: string
}) => {
	return (
		<div>
			<h3>post list</h3>
			{posts.map((p: postType) => (
				<div key={p.id}>
					<Link to={`/user/group/${groupUrl}/post/${p.titleUrl}`}>
						{p.title}
					</Link>
				</div>
			))}
		</div>
	)
}
