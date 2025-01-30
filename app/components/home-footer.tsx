import { Link } from 'react-router'

export const HomeFooter = () => {
	return (
		<footer>
			<ul>
				<li>
					<Link to='/'>Kezdőlap</Link>
				</li>
				<li>
					<Link to='/group'>Csoportok</Link>
				</li>
				<li>
					<Link to='/user'>Profil</Link>
				</li>
				<li>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
			</ul>

			<small>{new Date().getFullYear()} Airsoft Naptár</small>
		</footer>
	)
}
