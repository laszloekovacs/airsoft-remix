import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { createBrowserClient } from '@supabase/ssr'
import { createClientSupabase } from '~/lib/createClientSupabase'

export default function Index() {
	const supabase = createClientSupabase()

	return (
		<div>
			<Link to='/'>Vissza a főoldalra</Link>
			<h1>Belépés</h1>

			<button
				onClick={async () => {
					const { error } = await supabase.auth.signInWithOAuth({
						provider: 'facebook',
						options: {
							redirectTo: 'http://localhost:3000/auth/callback'
						}
					})
					if (error) {
						console.error('Error logging in', error)
					}
				}}>
				Login with GitHub
			</button>
			<hr />
			<button onClick={() => supabase.auth.signOut()}>Logout</button>
		</div>
	)
}
