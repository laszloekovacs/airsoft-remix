import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { GitHubStrategy } from 'remix-auth-github'
import { AirsoftSessionData, sessionStorage } from './session.server'

import { and, eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { users } from '~/schema/schema.server'
import { db } from './drizzle.server'

// TODO: add generic of a type that the authenticator will return
export const authenticator = new Authenticator<AirsoftSessionData>(
	sessionStorage
)

const githubStrategy = new GitHubStrategy(
	{
		clientId: process.env.GITHUB_CLIENT_ID!,
		clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		redirectURI: process.env.GITHUB_REDIRECT_URL!
	},
	async ({ profile, tokens, request, context }) => {
		//return user data from database using profile

		const user = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
				avatar_url: users.avatar_url,
				claims: users.claims
			})
			.from(users)
			.where(eq(users.email, profile._json.email))

		// if we found him, return him
		if (user.length != 0) {
			return user[0]
		} else {
			// if not found, send him to register or sign out
			const newuser: AirsoftSessionData = {
				id: '',
				name: profile._json.name,
				email: profile._json.email,
				avatar_url: profile._json.avatar_url,
				claims: []
			}

			return newuser
		}
	}
)

const formStrategy = new FormStrategy(async ({ form, context }) => {
	const email = form.get('email') as string
	const password = form.get('password') as string

	// TODO: validate probably better
	invariant(typeof email == 'string', 'username is not a string')
	invariant(email.length > 0, 'username is required')

	invariant(typeof password == 'string', 'password is not a string')
	invariant(password.length > 0, 'password is required')

	// hash the password
	//const hashedPassword = await hash(password, 64)

	// find the user
	const user = await db
		.select()
		.from(users)
		.where(and(eq(users.email, email), eq(users.password, password)))

	invariant(user.length == 1, 'user not found')

	return user[0]
})

authenticator.use(formStrategy, 'form')
authenticator.use(githubStrategy, 'github')
