import ContactList from '~/components/contact-list'
import UserEventTable from '~/components/UsersEventTable/UserEventTable'
import { queryUserEventList } from '~/queries/queryUserEventList.server'
import { getSession } from '~/services/auth.server'
import type { Route } from './+types/_home.user._index'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await getSession(request)

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
