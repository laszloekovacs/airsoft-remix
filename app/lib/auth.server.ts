import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '~/lib/db.server'
import { account, session, user, verification } from '~/schema/auth-schema'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			account: account,
			user: user,
			session: session,
			verification: verification
		}
	}),
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		github: {
			enabled: true,
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		}
	}
})
