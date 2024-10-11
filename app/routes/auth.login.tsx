import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useOutletContext } from '@remix-run/react'
import { createServerSupabaseClient } from '~/lib/supabase.server'
import { OutletContext } from '~/root'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)
	const { data: user, error } = await supabase.auth.getUser()

	// user is allready signed in
	if (user) {
		return redirect('/', { headers })
	}

	return json({ status: 'ok' }, { headers })
}

export default function LoginPage() {
	const { supabase } = useOutletContext<OutletContext>()

	const handleLogin = async (provider: 'facebook' | 'github') => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider
		})

		if (error) throw error
	}

	return (
		<>
			<div>
				<Link to='/'>Vissza a főoldalra</Link>
				<h1>Belépés</h1>

				<button onClick={() => handleLogin('github')}>github</button>
				<button onClick={() => handleLogin('facebook')}>facebook</button>
			</div>
		</>
	)
}
