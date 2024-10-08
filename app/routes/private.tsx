import { redirect, useLoaderData } from '@remix-run/react'

import { createClient } from '@supabase/supabase-js'
import { Database } from '~/supabase'

export const loader = async () => {
	const supabase = createClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!
	)

	const { data, error } = await supabase.auth.getSession()

	if (error || !data.session) {
		return redirect('/login')
	}

	return {
		user: data.session.user
	}
}

export default function Private() {
	const { user } = useLoaderData<typeof loader>()
	return <h1>{user.email}</h1>
}
