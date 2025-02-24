import { NavLink } from 'react-router'

export type NavLinkListProps = {
	items: Array<{ name: string; href: string }>
}

export const NavLinkList = (props: NavLinkListProps) => {
	const { items } = props

	return (
		<nav>
			{items.map(item => (
				<li key={item.name}>
					<NavLink to={item.href}>{item.name}</NavLink>
				</li>
			))}
		</nav>
	)
}
