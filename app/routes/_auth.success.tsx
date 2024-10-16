import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

export const loader = ({ params, request }: LoaderFunctionArgs) => {
	const reason = new URL(request.url).searchParams.get('reason')
	invariant(reason, 'reason is required')

	return { reason }
}

const AuthSuccessPage = () => {
	const { reason } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Sikeresen regisztráltal!</h2>
			<p>kuldtunk neked egy levelet amivel aktivalhatod a fiokod</p>
			<Link to='/login'>Bejelentkezés</Link>

			<pre>{JSON.stringify(reason, null, 2)}</pre>
		</div>
	)
}

export default AuthSuccessPage
