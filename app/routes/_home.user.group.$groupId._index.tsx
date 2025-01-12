import React from 'react'
import type { Route } from './+types/_home.user.group.$groupId._index'
import { Link } from 'react-router'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	return { id: params.groupId }
}

export default function GroupDetailsPage({ loaderData }: Route.ComponentProps) {
	const { id } = loaderData

	return (
		<div>
			<span>{id}</span>
			<h2>Csoport hirdetései</h2>

			<div>
				<PostsListContainer id={id} />
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
