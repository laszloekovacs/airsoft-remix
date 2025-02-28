import { betterAuth, type Session, type User } from 'better-auth'
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
			metadata: {
				type: 'string',
				required: false
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

type SessionCookieData = {
	user: User
	session: Session
}

export function isCookieFromRequest(
	cookie: unknown
): cookie is SessionCookieData {
	if (cookie == null || typeof cookie !== 'object') return false

	const { session, user } = cookie as SessionCookieData
	if (
		session == null ||
		user == null ||
		typeof session !== 'object' ||
		typeof user !== 'object'
	)
		return false

	return true
}
