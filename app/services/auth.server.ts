import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { customSession } from 'better-auth/plugins'
import { drizzleClient } from './db.server'
import {
	account,
	session,
	user as authUser,
	verification
} from '~/schema/auth-schema'

export const auth = betterAuth({
	database: drizzleAdapter(drizzleClient, {
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
				required: false,
				input: false
			},
			callsign: {
				type: 'string',
				required: false,
				input: true
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
	},
	plugins: [
		customSession(async ({ user, session }) => {
			/// @ts-ignore
			const claims = user?.claims?.split(',') || []
			/// @ts-ignore
			const callsign = user?.callsign || ''
			return {
				callsign,
				claims,
				user,
				session
			}
		})
	]
})

export default auth
