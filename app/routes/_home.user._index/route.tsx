import UserEventTable from '~/routes/_home.user._index/UserEventTable'
import { queryUserEventList } from '~/queries/queryUserEventList.server'
import { getCookieFromRequest } from '~/services/auth.server'
import type { Route } from './+types/route'
import ContactList from './ContactList'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getCookieFromRequest(request)

	if (!session || !session?.user)
		return new Response('Unauthorized', { status: 401 })

	const userEvents = await queryUserEventList(session.user.id)

	return { userEvents }
}

export default function UserIndexPage({ loaderData }: Route.ComponentProps) {
	const { userEvents } = loaderData

	return (
		<div>
			<ContactList contacts={[]} />

			<UserEventTable eventSummaryList={userEvents} />
		</div>
	)
}
