import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'
import { Database } from '~/supabase'

export const createServerSupabase = (req: Request) => {
	const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = process.env
	if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
		throw new Error('Missing environment variables. Check your .env file.')
	}

	const headers = new Headers()

	const supabase = createServerClient<Database>(
		VITE_SUPABASE_URL,
		VITE_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(req.headers.get('Cookie') ?? '')
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						headers.append(
							'Set-Cookie',
							serializeCookieHeader(name, value, options)
						)
					})
				}
			}
		}
	)

	return { supabase, headers }
}
