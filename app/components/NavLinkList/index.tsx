import { NavLink } from 'react-router'

export type NavLinkListProps = {
	items: Array<{ name: string; to: string }>
}

export const NavLinkList = (props: NavLinkListProps) => {
	const { items } = props

	return (
		<nav>
			{items.map(item => (
				<li key={item.to}>
					<NavLink to={item.to}>
						<span>{item.name}</span>
					</NavLink>
				</li>
			))}
		</nav>
	)
}
