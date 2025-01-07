import { createAuthClient } from 'better-auth/react'

// TODO: move this to env.
const baseURL = 'http://localhost:3000'

export const authClient = createAuthClient({
	baseURL
})
