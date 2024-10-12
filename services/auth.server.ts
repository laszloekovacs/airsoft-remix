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

		// if the array is empty
		if (user.length == 0) {
			return {
				isnew: true,
				name: profile._json.name,
				email: profile._json.email,
				avatar_url: profile._json.avatar_url
			}
		}

		console.log(user[0])

		return user
	}
)

authenticator.use(githubStrategy, 'github')
