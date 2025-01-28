import { Link } from 'react-router'

export function HomeHeader() {
	return (
		<header>
			<Link to='/'>
				<h1>Airsoft Naptár</h1>
			</Link>
		</header>
	)
}
