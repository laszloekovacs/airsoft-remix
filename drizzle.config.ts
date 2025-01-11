import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: './drizzle',
	schema: ['./app/schema/index.ts'],
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.DB_FILE_NAME!
	}
})
