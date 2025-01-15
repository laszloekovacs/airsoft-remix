import { EventCalendarContainer } from '~/components/event-list'
import type { Route } from './+types/_home._index'

export const loader = async ({ request }: Route.LoaderArgs) => {
	// extract 'page' search param
	const url = new URL(request.url)
	const page = url.searchParams.get('page')

	console.log(page)

	if (page) {
		return { page: Number(page) }
	} else {
		return { page: 0 }
	}
}

const HomeIndex = ({ loaderData }: Route.ComponentProps) => {
	const { page } = loaderData

	return (
		<div>
			<p>page: {page}</p>

			<EventCalendarContainer />
		</div>
	)
}

export default HomeIndex
