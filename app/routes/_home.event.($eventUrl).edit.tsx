import { Outlet } from 'react-router'
import { NavLinkList, type NavLinkListProps } from '~/components/NavLinkList'

type EventEditPagePRops = {
	params: { eventUrl: string }
}

export default function EventEditPage(props: EventEditPagePRops) {
	const { params } = props

	const links: NavLinkListProps = {
		items: [
			{
				name: 'nev es datum',
				to: params.eventUrl ? `/event/${params.eventUrl}/edit` : '/event/edit'
			},
			{
				name: 'idopontok',
				to: `/event/${params.eventUrl}/edit/schedule`
			}
		]
	}

	return (
		<div>
			<h1>Esemény szerkesztése</h1>
			<NavLinkList {...links} />
			<Outlet />
		</div>
	)
}
