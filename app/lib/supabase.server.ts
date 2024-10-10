import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'

export const createServerSupabaseClient = (request: Request) => {
	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
		throw new Response('Missing environment variables. Check your .env file.', {
			status: 500
		})
	}

	const headers = new Headers()

	const supabase = createServerClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => {
					return parseCookieHeader(request.headers.get('Cookie') ?? '')
				},
				setAll: cookiesToSet => {
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

	return {
		supabase,
		headers
	}
}
