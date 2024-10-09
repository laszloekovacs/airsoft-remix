import { Link, useOutletContext } from '@remix-run/react'
import { Login, Logout } from '~/components/Login'
import { OutletContext } from '~/root'

export default function AuthLoginPage() {
	const { session } = useOutletContext<OutletContext>()

	return (
		<div>
			<Link to='/'>Vissza a főoldalra</Link>
			<h1>Belépés</h1>
			{!session?.user ? <Login /> : <Logout />}
			{session?.user && <p>Szia, {session.user.email}!</p>}
		</div>
	)
}
