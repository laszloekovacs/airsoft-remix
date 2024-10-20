const env = {
	DATABASE_URL: process.env.DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,

	SESSION_SECRET: process.env.SESSION_SECRET,

	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL
}

// loop trough the env object and check if the value is undefined
// if it is undefined, throw an error
for (const [key, value] of Object.entries(env)) {
	if (value === undefined) {
		throw new Error(`Expected server environment variable ${key}`)
	}
}

export default env
