import { createAuthClient } from 'better-auth/react'

const baseURL = 'http://localhost:3000'

export const authClient = createAuthClient({
	baseURL
})
