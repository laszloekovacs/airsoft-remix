import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { createServerSupabaseClient } from '~/lib/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)

	const {
		data: { user },
		error: userError
	} = await supabase.auth.getUser()

	// there is no user, redirect to login
	if (userError || !user) {
		return redirect('/login')
	}

	// the user.id is equals the id in the profile table
	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single()

	if (profileError || !profile) {
		console.log(profileError)
	}

	// return the profile row
	return json(
		{
			data: profile
		},
		{ headers }
	)
}

export default function ProfilePage() {
	const { data: profile } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>Profile</h1>

			{<pre>{JSON.stringify(profile, null, 2)}</pre>}
		</div>
	)
}
