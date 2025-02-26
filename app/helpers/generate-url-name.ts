export function generateUrlName(title: string) {
	// 1. Replace accents and special characters
	const normalizedTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

	// 2. Replace spaces with hyphens
	const hyphenatedTitle = normalizedTitle.replace(/\s+/g, '-')

	// 3. Convert to lowercase
	const lowercaseTitle = hyphenatedTitle.toLowerCase()

	// 4. Remove non-alphanumeric characters
	const urlName = lowercaseTitle.replace(/[^a-z0-9-]/g, '')

	return urlName
}
