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
					<Link to='/user/profile'>Profil</Link>
				</li>
			</ul>

			<p>{new Date().getFullYear()} Airsoft Naptár</p>
		</footer>
	)
}
