import { Link } from 'react-router'

export const HomeFooter = () => {
	return (
		<footer>
			<hr />
			<p>© {new Date().getFullYear()} Airsoft Naptár</p>

			<ul>
				<li>
					<Link to='/'>Kezdőlap</Link>
				</li>
				<li>
					<Link to='/group'>Csoportok</Link>
				</li>
			</ul>
		</footer>
	)
}
