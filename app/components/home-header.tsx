import { Link } from 'react-router'

export function HomeHeader() {
	return (
		<header>
			<Link to='/'>
				<h1 className='text-2xl font-bold mb-3'>Airsoft Naptár</h1>
			</Link>
		</header>
	)
}
