import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { z, ZodError } from 'zod'
import { authenticator } from '~/services/auth.server'

export default function LoginPage() {
	const actionData = useActionData<typeof action>()

	return (
		<div className='grid place-content-center min-h-lvh'>
			<img src='/logo-light.png' alt='logo' width='128'></img>
			<h2>Belepes emaillel</h2>

			<Form method='post'>
				<div className='flex flex-col gap-2 max-w-56'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' required />
					{actionData?.status == 'invalid_email' && (
						<p className='text-red-500'>invalid email</p>
					)}

					<label htmlFor='password'>Jelszo</label>
					<input type='password' name='password' id='password' required />

					<button type='submit' name='action' value='login_email'>
						Login
					</button>

					<h2 className='mt-8'>Social login</h2>

					<button type='submit' name='action' value='github'>
						Github
					</button>
				</div>
			</Form>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	try {
		// check what action to do
		const formData = await request.formData()
		const action = formData.get('action') as string
		invariant(action, 'action is required')

		switch (action) {
			case 'login_email':
				const emailSchema = z.string().email('hibas email forma')
				const email = emailSchema.parse(formData.get('email'))

				const passwordSchema = z
					.string()
					.min(8, 'jelszo rovidebb mint 8 karakter')
				const password = passwordSchema.parse(formData.get('password'))

				return authenticator.authenticate('form', request, {
					successRedirect: '/',
					failureRedirect: '/auth.login'
				})

			default:
				throw new Error('invalid action')
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return json({
				message: error.message,
				status: 'error'
			})
		}
		// not a schema validation error, propagate
		throw error
	}

	throw new Error('invalid action')
}
