import { createAuthClient } from 'better-auth/react'

const baseUrl = import.meta.env.VITE_BASE_URL

export const authClient = createAuthClient({
	baseURL: baseUrl
})
