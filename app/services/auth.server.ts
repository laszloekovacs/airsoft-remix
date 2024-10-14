import { Authenticator } from 'remix-auth'
import { sessionStorage } from './session.server'
import { GitHubStrategy } from 'remix-auth-github'
import { db } from './drizzle.server'
import { eq } from 'drizzle-orm'
import { users } from '~/schema/schema.server'

// TODO: add generic of a type that the authenticator will return
export const authenticator = new Authenticator<SessionUser>(sessionStorage)

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
			const newuser: SessionUser = {
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

authenticator.use(githubStrategy, 'github')

export type SessionUser = Required<typeof users.$inferInsert>
