import { createCookieSessionStorage } from '@remix-run/node'

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'airsoft-remix-session',
		sameSite: 'lax', // only sent to same site
		path: '/', // available on all routes
		httpOnly: true, // `httpOnly` means that the cookie is only accessible over the http(s) protocol and not via JavaScript, which helps protect against cross-site scripting (XSS) attacks.
		secrets: ['s3cr3t'],
		secure: process.env.NODE_ENV === 'production'
	}
})

export const { getSession, commitSession, destroySession } = sessionStorage
