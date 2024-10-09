import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader
} from '@supabase/ssr'
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

	if (error) throw new Error(error.message)

	return json({ user }, { headers: response.headers })
}

export default function Page() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<div className='home-header'>
				<Link to='/'>
					<h1>Airsoft napár</h1>
				</Link>
			</div>

			<Outlet />
		</div>
	)
}
