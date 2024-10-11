import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import { User } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '~/lib/supabase.server'
import { OutletContext } from '~/root'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)

	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	if (error) {
		// getUser will set the error if the user isnt logged in, tho its not a problem
		console.warn(error.message)
		return json({ user: null }, { headers })
	} else {
		// extract from the user obj the only relevant data needed
		const userData = extractRelevantUserData(user)

		return json({ user: userData }, { headers })
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
	// sadly we have to pass the context along, or take it from the root loader
	const context = useOutletContext<OutletContext>()

	return (
		<div>
			<div className='home-header'>
				<Link to='/'>
					<h1>Airsoft napár</h1>
				</Link>

				<SessionState user={user} />
			</div>

			<Outlet context={context} />
		</div>
	)
}

export const SessionState = ({ user }: { user: any }) => {
	return (
		<div>
			{user ? <ProfileButton avatar_url={user.avatar_url} /> : <LoginButton />}
		</div>
	)
}

export const ProfileButton = ({ avatar_url }: { avatar_url: string }) => {
	return (
		<button>
			<img src={avatar_url} width='32' />
		</button>
	)
}

export const LoginButton = () => {
	return <Link to='/login'>Login</Link>
}
