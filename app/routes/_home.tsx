import { Link, Outlet } from '@remix-run/react'

export default function Page() {
	return (
		<div>
			<div className='home-header'>
				<Link to='/'>
					<h1>Airsoft napár</h1>
				</Link>
			</div>

			<Outlet />
		</div>
	)
}
//<LoginState username={username} />
/*
const LoginState = ({ username }: { username: string }) => {
	const navigate = useNavigate()

	const logout = async () => {
		console.log('logging out')
		const { error } = await createClientSupabase().auth.signOut()

		if (error) {
			throw new Error(error.message)
		}

		navigate('/')
	}

	if (!username) {
		return <Link to='/login'>Bejelentkezés</Link>
	} else {
		return (
			<div>
				<p>{username}</p>
				<button onClick={logout}>Kijelentkezés</button>
			</div>
		)
	}
}
*/
