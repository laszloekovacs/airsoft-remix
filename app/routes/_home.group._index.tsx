import GroupList from '~/components/group-list'
import { drizzleClient } from '~/services/db.server'
import type { Route } from './+types/_home.group._index'
import { group } from '~/schema'

export const loader = async ({ request }: Route.LoaderArgs) => {
	// get page parameter from the request
	const url = new URL(request.url)
	const page = url.searchParams.get('page')
	// calculate offset based on the page parameter
	let offset = 0
	if (page) {
		offset = parseInt(page, 10) * 10
	}

	const numberOfGroups = await drizzleClient.$count(group)
	const pageCount = Math.ceil(numberOfGroups / 10)

	const groupList = await drizzleClient
		.select({ id: group.id, name: group.name, url: group.url })
		.from(group)
		.offset(offset)
		.limit(10)

	return { groupList, pageCount }
}

export default function GroupsListingPage({
	loaderData
}: Route.ComponentProps) {
	const { groupList, pageCount } = loaderData

	return (
		<div>
			<h1>Csoportok</h1>
			<section>
				<GroupList groups={groupList} />
			</section>
		</div>
	)
}
