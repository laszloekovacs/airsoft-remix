import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { users } from '~/schema/schema.server'
import { db } from '~/services/drizzle.server'
import { hashPassword } from '~/util/crypto.server'
// redirect if already logged in

export default function Signup() {
	const actionData = useActionData<typeof action>()

	return (
		<div>
			<Form method='post'>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' />

				<label htmlFor='password'>Password</label>
				<input type='password' name='password' />

				<button type='submit'>Signup</button>
			</Form>

			<p>
				Mar rendelkezel fiokkal? <Link to='/login'>Lepj be</Link>
			</p>

			<div>{actionData?.message}</div>
		</div>
	)
}

// check if input is valid, user does not exists
export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	// TODO: validate
	invariant(formData.get('email'), 'email is required')
	const email = formData.get('email') as string

	invariant(formData.get('password'), 'password is required')
	const password = formData.get('password') as string

	// TODO: hash the password

	// check if user already exists
	const user = await db
		.select({ em: users.email })
		.from(users)
		.where(eq(users.email, email))

	if (user.length > 0) {
		return {
			message: 'email already exists',
			status: 'email_exists'
		}
	}

	const hashedPassword = await hashPassword(password)

	// new email, create user
	await db.insert(users).values({
		email: email,
		password: JSON.stringify(hashedPassword),
		claims: [],
		name: email,
		avatar_url: ''
	})

	// TODO: send confirm email
	return redirect('/result?status=signup')
}
