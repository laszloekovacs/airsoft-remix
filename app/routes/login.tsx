import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { authenticator } from '~/services/auth.server'

export default function LoginPage() {
	return (
		<div className='grid place-content-center min-h-lvh'>
			<img src='/logo-light.png' alt='logo' width='128'></img>
			<h2>Belepes emaillel</h2>

			<Form method='post'>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' required />

				<label htmlFor='password'>Jelszo</label>
				<input type='password' name='password' id='password' required />

				<input type='submit' value='Belepes' name='login' id='login' />

				<h2 className='mt-8'>Social login</h2>
			</Form>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	return authenticator.authenticate('form', request, {
		successRedirect: '/',
		failureRedirect: '/'
	})
}
