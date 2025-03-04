import { Link } from 'react-router'

export const HomeFooter = () => {
	return (
		<div className='py-5'>
			<div className='flex flex-col gap-2'>
				<Link to='/'>Kezdőlap</Link>
				<Link to='/user'>Profil</Link>
			</div>

			<small>{new Date().getFullYear()} Airsoft Naptár</small>
		</div>
	)
}
