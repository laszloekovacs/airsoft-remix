const base = './data/content/'

export const storage_write = async (key: string, attachment: File) => {
	const path = base + key

	return await Bun.write(key, path)
}
