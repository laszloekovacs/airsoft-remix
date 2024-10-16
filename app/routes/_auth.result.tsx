import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

export const loader = ({ params, request }: LoaderFunctionArgs) => {
	const status = new URL(request.url).searchParams.get('status')
	invariant(status, 'status is required')

	return { status }
}

const AuthSuccessPage = () => {
	const { status } = useLoaderData<typeof loader>()

	if (status == 'signup') {
		return (
			<div>
				<h2>Sikeresen regisztráltal!</h2>
				<p>kuldtunk neked egy levelet amivel aktivalhatod a fiokod</p>
				<Link to='/login'>Bejelentkezés</Link>

				<pre>{JSON.stringify(status, null, 2)}</pre>
			</div>
		)
	} else {
		return (
			<div>
				<h2>Sikeres bejelentkezes</h2>

				<Link to='/'>Vissza a folodalra</Link>

				<pre>{JSON.stringify(status, null, 2)}</pre>
			</div>
		)
	}
}

export default AuthSuccessPage
