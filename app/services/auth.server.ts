import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { customSession } from 'better-auth/plugins'
import { db } from './db.server'
import {
	account,
	session,
	user as authUser,
	verification
} from '~/schema/auth-schema'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			account: account,
			user: authUser,
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
				required: true,
				input: false,
				defaultValue: ''
			},
			callsign: {
				type: 'string',
				required: true,
				input: true,
				defaultValue: ''
			}
		}
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['github', 'discord']
		}
	},
	advanced: {
		cookiePrefix: 'airsoft'
	}
})

// helper for getting session
export async function getSession(request: Request) {
	return auth.api.getSession({ headers: request.headers })
}
