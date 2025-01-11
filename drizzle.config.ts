import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: './drizzle',
	schema: ['./app/schema/index.ts', './app/schema/auth-schema.ts'],
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.DB_FILE_NAME!
	}
})
