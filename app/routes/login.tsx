import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createBrowserClient } from '@supabase/ssr'

export async function loader({}: LoaderFunctionArgs) {
	return {
		env: {
			SUPABASE_URL: process.env.SUPABASE_URL!,
			SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
		}
	}
}

export default function Index() {
	const { env } = useLoaderData<typeof loader>()

	const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

	return (
		<div>
			<h1>Login</h1>

			<button
				onClick={async () => {
					const { error } = await supabase.auth.signInWithOAuth({
						provider: 'github',
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
