import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { OutletContext } from '~/root'
import { Database } from '~/supabase'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response()

	const supabase = createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get('Cookie') ?? '')
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						response.headers.append(
							'Set-Cookie',
							serializeCookieHeader(name, value, options)
						)
					})
				}
			}
		}
	)

	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	if (error) {
		// getUser will set the error if the user isnt logged in, tho its not a problem
		console.warn(error.message)
		return json({ user: null }, { headers: response.headers })
	} else {
		// extract from the user obj the only relevant data needed
		const userData = extractRelevantUserData(user)

		return json({ user: userData }, { headers: response.headers })
	}
}

const extractRelevantUserData = (user: User | null) => {
	const provider = (user?.app_metadata?.provider as string) || null

	const name = (user?.user_metadata?.name as string) || null

	const nickname = (user?.user_metadata?.nickname as string) || null

	const avatar_url = (user?.user_metadata?.avatar_url as string) || null

	return { provider, name, nickname, avatar_url }
}

export default function Page() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<div className='home-header'>
				<Link to='/'>
					<h1>Airsoft napár</h1>
				</Link>

				<SessionState user={user} />
			</div>

			<Outlet />
		</div>
	)
}

export const SessionState = ({ user }: { user: any }) => {
	return <div>{user ? <ProfileButton /> : <LoginButton />}</div>
}

export const ProfileButton = () => {
	return <button>Profile</button>
}

export const LoginButton = () => {
	return <Link to='/login'>Login</Link>
}
