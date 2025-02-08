import { Link } from 'react-router'

export const HomeFooter = () => {
	return (
		<footer className='my-5'>
			<nav className='mb-4'>
				<li>
					<Link to='/'>Kezdőlap</Link>
				</li>
				<li>
					<Link to='/user'>Profil</Link>
				</li>
			</nav>

			<small>{new Date().getFullYear()} Airsoft Naptár</small>
		</footer>
	)
}
