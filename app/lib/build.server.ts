import fs from 'fs'
import path from 'path'

// returns the date of the package.json file.
export function getBuildDate() {
	try {
		const packageJsonPath = path.resolve(import.meta.dirname, 'package.json')
		const stats = fs.statSync(packageJsonPath)

		const mtime = new Date(stats.mtime)
		return mtime
	} catch (error) {
		console.error('Error getting build date', error)
		return null
	}
}
