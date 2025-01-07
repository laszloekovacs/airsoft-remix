import fs from 'fs'

// returns the date of the package.json file.
export function getBuildDate() {
	const file = import.meta.dirname
	const stats = fs.statSync(file)
	const mtime = new Date(stats.mtime)
	return mtime
}
