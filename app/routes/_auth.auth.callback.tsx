import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { createServerSupabase } from '~/lib/createServerSupabase.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')
	const next = requestUrl.searchParams.get('next') || '/'
	const access_token = requestUrl.searchParams.get('access_token')

	if (code) {
		const { supabase, headers } = createServerSupabase(request)

		const { error } = await supabase.auth.exchangeCodeForSession(code)

		if (!error) {
			console.log('login success')
			return redirect(next, { headers })
		} else {
			console.error('login error', error)
		}
	}

	// return the user to an error page with instructions
	return redirect('/auth/auth-code-error')
}
