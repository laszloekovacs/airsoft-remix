import { Link } from 'react-router'
import { drizzleClient } from '~/lib/db.server'
import { event } from '~/schema'
import type { Route } from './+types/dashboard.group.$groupUrl_._index'

type postType = typeof event.$inferSelect

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const posts = await drizzleClient.select().from(event)

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
			<Link to={`/dashboard/group/${id}/post`}>new post</Link>
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
					<Link to={`/dashboard/group/${groupUrl}/post/${p.titleUrl}`}>
						{p.title}
					</Link>
				</div>
			))}
		</div>
	)
}
