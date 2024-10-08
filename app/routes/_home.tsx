import {
	json,
	Link,
	Outlet,
	redirect,
	useLoaderData,
	useNavigate,
	useRouteLoaderData
} from '@remix-run/react'
import { createServerSupabase } from '~/lib/createServerSupabase.server'
import { createClientSupabase } from '~/lib/createClientSupabase'

export const loader = async ({ request }: { request: Request }) => {
	const { supabase, headers } = createServerSupabase(request)

	const {
		data: { session },
		error
	} = await supabase.auth.getSession()

	if (error) {
		throw new Error(error.message)
	}

	if (!session) {
		return json({ user: null }, { headers })
	} else {
		const { data: user, error } = await supabase.auth.getUser()

		if (error) {
			throw new Error(error.message)
		}

		return json({ user }, { headers })
	}
}

export default function Page() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<div className='home-header'>
				<Link to='/'>
					<h1>Airsoft napár</h1>
				</Link>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</div>

			<Outlet />
		</div>
	)
}
//<LoginState username={username} />

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
