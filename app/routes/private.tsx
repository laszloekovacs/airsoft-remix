import { redirect, useLoaderData } from '@remix-run/react'

import { createClient } from '@supabase/supabase-js'
import { Database } from '~/supabase'

export const loader = async () => {
	const supabase = createClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!
	)

	const { data, error } = await supabase.auth.getSession()

	if (error || !data) {
		console.log(error)

		return redirect('/login')
	}

	console.log(data)
	return {
		data
	}
}

export default function Private() {
	const { data } = useLoaderData<typeof loader>()
	return <h1>{JSON.stringify(data, null, 2)}</h1>
}
