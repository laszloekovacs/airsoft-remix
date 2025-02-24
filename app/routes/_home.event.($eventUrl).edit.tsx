import { Outlet, type NavLinkProps } from 'react-router'
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
				href: params.eventUrl ? `/event/${params.eventUrl}/edit` : '/event/edit'
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
