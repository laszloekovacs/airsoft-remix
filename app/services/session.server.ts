import { createCookieSessionStorage, SessionData } from '@remix-run/node'

// TODO: infer this type somehow
export type AirsoftSessionData = {
	id: string
	name: string
	email: string
	avatar_url: string | null
	claims: string[]
} & SessionData

export const sessionStorage = createCookieSessionStorage<
	AirsoftSessionData,
	AirsoftSessionData
>({
	cookie: {
		name: 'airsoft-session',
		sameSite: 'lax', // only sent to same site
		path: '/', // available on all routes
		httpOnly: true, // `httpOnly` means that the cookie is only accessible over the http(s) protocol and not via JavaScript, which helps protect against cross-site scripting (XSS) attacks.
		secrets: [process.env.SESSION_SECRET!],
		secure: true
	}
})

export const { getSession, commitSession, destroySession } = sessionStorage
