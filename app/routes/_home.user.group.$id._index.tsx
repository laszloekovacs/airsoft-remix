import React from 'react'
import type { Route } from './+types/_home.user.group.$id._index'
import { Link } from 'react-router'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const id = parseInt(params.id)

	return { id }
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

const PostsListContainer = ({ id }: { id: number }) => {
	return (
		<div>
			<Link to={`/user/group/${id}/post`}>new post</Link>
		</div>
	)
}
