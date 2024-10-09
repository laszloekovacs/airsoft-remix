import { useOutletContext } from '@remix-run/react'
import type { OutletContext } from '~/root'

export const Login = () => {
	const { supabase } = useOutletContext<OutletContext>()

	const handleLogin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'github'
		})
	}

	return (
		<div>
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export const Logout = () => {
	const { supabase } = useOutletContext<OutletContext>()

	const handleLogout = () => {
		supabase.auth.signOut()
	}

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}
