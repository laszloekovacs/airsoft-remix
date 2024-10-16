import crypto from 'node:crypto'

export const hashPassword = (password: string) => {
	const salt = crypto.randomBytes(16).toString('hex')
	const iterations = 10000
	const keygen = 64
	const digest = 'sha512'

	const hash = crypto.pbkdf2Sync(password, salt, iterations, keygen, digest)
	return { hash: hash.toString('hex'), salt }
}

export const verifyPassword = (
	password: string,
	hash: string,
	salt: string
) => {
	const iterations = 10000
	const keygen = 64
	const digest = 'sha512'

	const newHash = crypto.pbkdf2Sync(password, salt, iterations, keygen, digest)
	return newHash.toString('hex') === hash
}
