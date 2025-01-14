import React from 'react'
import type { Route } from './+types/_home.user.group.$groupUrl._index'
import { Link } from 'react-router'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	return { groupUrl: params.groupUrl }
}

export default function GroupDetailsPage({ loaderData }: Route.ComponentProps) {
	const { groupUrl } = loaderData

	return (
		<div>
			<span>{groupUrl}</span>
			<h2>Csoport hirdetései</h2>

			<div>
				<PostsListContainer id={groupUrl} />
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
