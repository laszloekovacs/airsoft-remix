import { Authenticator } from 'remix-auth'
import { sessionStorage } from './session.server'
import { GitHubStrategy } from 'remix-auth-github'
import { db } from './drizzle.server'
import { eq } from 'drizzle-orm'
import { users } from 'schema/schema.server'

// TODO: add generic of a type that the authenticator will return
export const authenticator = new Authenticator(sessionStorage)

const githubStrategy = new GitHubStrategy(
	{
		clientId: process.env.GITHUB_CLIENT_ID!,
		clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		redirectURI: process.env.GITHUB_REDIRECT_URL!
	},
	async ({ profile, tokens, request, context }) => {
		//return user data from database using profile

		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, profile._json.email))

		// if not found, send him to register or sign out
		if (user.length == 0) {
			const newuser = {
				isRegistered: false,
				name: profile._json.name,
				email: profile._json.email,
				avatar_url: profile._json.avatar_url
			}

			console.log('new user')
			return { newuser }
		} else {
			console.log('found user')
			// if we found him, return him
			return user[0]
		}
	}
)

authenticator.use(githubStrategy, 'github')
