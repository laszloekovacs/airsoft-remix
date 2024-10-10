import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
	isRouteErrorResponse,
	json,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRevalidator,
	useRouteError
} from '@remix-run/react'

import { createBrowserClient } from '@supabase/ssr'
import { Session, SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from './lib/supabase.server'
import styles from './styles.css?url'

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous'
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
	},
	{
		rel: 'stylesheet',
		href: styles
	}
]

export const Layout = ({ children }: { children: React.ReactNode }) => (
	<html lang='hu'>
		<head>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<Meta />
			<Links />
		</head>
		<body>
			{children}
			<ScrollRestoration />
			<Scripts />
		</body>
	</html>
)

export default function App() {
	const { env, session } = useLoaderData<typeof loader>()
	const { revalidate } = useRevalidator()

	const [supabase] = useState(() =>
		createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
	)

	const serverAccessToken = session?.access_token ?? null

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.access_token !== serverAccessToken) {
				revalidate()
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [revalidate, serverAccessToken, supabase])

	return <Outlet context={{ supabase, session }} />
}

export type OutletContext = {
	supabase: SupabaseClient
	session: Session
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
		throw new Response('Missing environment variables. Check your .env file.', {
			status: 500
		})
	}
	const env = {
		SUPABASE_URL: process.env.SUPABASE_URL as string,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY as string
	}

	const { supabase, headers } = createServerSupabaseClient(request)

	const {
		data: { session }
	} = await supabase.auth.getSession()

	return json({ env, session }, { headers })
}

export function ErrorBoundary() {
	const error = useRouteError() as any
	console.error(error)

	let errormessage = error instanceof Error ? error.message : null

	return (
		<Layout>
			<section>
				<h1>Somewhat expected Error</h1>
				{isRouteErrorResponse(error) && <p>{error.status}</p>}
				<p>something when wrong</p>
				{errormessage && <pre>Error message:{errormessage}</pre>}
				<hr />
				{process.env.NODE_ENV == 'development' && error?.stack && (
					<pre>{error.stack}</pre>
				)}

				<Link to='/'>Vissza</Link>
			</section>
		</Layout>
	)
}
