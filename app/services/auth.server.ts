import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { account, session, user, verification } from '~/schema/auth-schema'
import { db } from './db.server'

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
export async function getCookieFromRequest(request: Request) {
	return auth.api.getSession({ headers: request.headers })
}

export function isCookieFromRequest(
	cookie: unknown
): cookie is Awaited<ReturnType<typeof auth.api.getSession>> {
	if (cookie == null || typeof cookie !== 'object') return false

	const { session, user } = cookie as { session?: unknown; user?: unknown }
	if (
		session == null ||
		user == null ||
		typeof session !== 'object' ||
		typeof user !== 'object'
	)
		return false

	return true
}
