import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from 'react-router'
import type { Route } from './+types/root'
import './root.css'
import type { JSX } from 'react'

export const links: Route.LinksFunction = () => [
	{ rel: 'icon', href: '/favicon.ico?v2' }
]

export function Layout({
	children
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body style={{ margin: 0, padding: 0 }}>
				<Theme
					accentColor='gold'
					grayColor='sand'
					radius='none'
					appearance='dark'>
					{children}
					<ScrollRestoration />
					<Scripts />
				</Theme>
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!'
	let details = 'An unexpected error occurred.'
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error'
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className='pt-16 p-4 container mx-auto'>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className='w-full p-4 overflow-x-auto'>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}
