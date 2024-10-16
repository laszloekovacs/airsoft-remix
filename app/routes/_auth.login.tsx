import { ActionFunctionArgs } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { authenticator } from '~/services/auth.server'

export default function LoginPage() {
	return (
		<div className='grid place-content-center min-h-lvh'>
			<Link to='/'>vissza a fooldalra</Link>
			<img src='/logo-light.png' alt='logo' width='128'></img>
			<h2>Belepes emaillel</h2>

			<Form method='post'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' required />

					<label htmlFor='password'>Jelszo</label>
					<input type='password' name='password' id='password' required />

					<input type='submit' value='Belepes' name='provider' id='login' />

					<p>
						Nincs Fiokod? <Link to='/signup'>Regisztrálj!</Link>
					</p>

					<h2 className='mt-8'>Social login</h2>
				</div>
			</Form>

			<div>
				<Link to='/auth/github/login'>github</Link>
			</div>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	return authenticator.authenticate('form', request, {
		successRedirect: '/result?status=login',
		failureRedirect: '/result?status=failure'
	})
}
