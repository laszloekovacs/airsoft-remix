import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form } from '@remix-run/react'
import invariant from 'tiny-invariant'

export default function LoginPage() {
	return (
		<div className='grid place-content-center min-h-lvh'>
			<img src='/logo-light.png' alt='logo' width='128'></img>
			<h2>Belepes emaillel</h2>

			<Form method='post'>
				<div className='flex flex-col gap-2 max-w-56'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' required />

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
	// check what action to do
	const formData = await request.formData()

	const action = formData.get('action') as string
	invariant(action, 'action is required')

	switch (action) {
		case 'login_email': {
			const email = formData.get('email') as string
			const password = formData.get('password') as string

			return json({
				message: 'ok',
				status: 'ok'
			})
		}
	}
}
