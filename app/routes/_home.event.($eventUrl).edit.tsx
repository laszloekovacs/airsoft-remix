import { Outlet } from 'react-router'
import { NavLinkList } from '~/components/NavLinkList'

export default function EventEditPage() {
	return (
		<div>
			<h1>Esemény szerkesztése</h1>
			<NavLinkList items={[]} />
			<Outlet />
		</div>
	)
}
