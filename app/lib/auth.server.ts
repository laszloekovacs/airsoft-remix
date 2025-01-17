import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { customSession } from 'better-auth/plugins'
import { db } from '~/lib/db.server'
import { account, session, user, verification } from '~/schema/auth-schema'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
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
		},
		discord: {
			enabled: true,
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!
		}
	},
	user: {
		deleteUser: {
			enabled: true
		},
		additionalFields: {
			claims: {
				type: 'string',
				required: false,
				input: false
			}
		}
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['github']
		}
	},
	advanced: {
		cookiePrefix: 'airsoft'
	},
	plugins: [
		customSession(async ({ user, session }) => {
			const claims = 'todo'
			return {
				claims,
				user,
				session
			}
		})
	]
})
