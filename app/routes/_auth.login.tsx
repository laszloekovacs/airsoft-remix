import { Link, useOutletContext } from '@remix-run/react'
import { OutletContext } from '~/root'

// TODO: loader should redirect if already logged in

export default function LoginPage() {
	const { supabase } = useOutletContext<OutletContext>()

	const handleLogin = async (provider: 'facebook' | 'github') => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider
		})

		if (error) {
			throw new Response(error.message, {
				status: 500
			})
		}
	}

	return (
		<div>
			<div>
				<Link prefetch='intent' to='/'>
					Vissza a főoldalra
				</Link>
				<h1>Belépés</h1>

				<button onClick={() => handleLogin('github')}>github</button>
				<button onClick={() => handleLogin('facebook')}>facebook</button>
			</div>
		</div>
	)
}
