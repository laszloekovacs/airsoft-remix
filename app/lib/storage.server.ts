const content_basepath = './data/content/'

export const storage_write = async (key: string, attachment: File) => {
	const path = content_basepath + key

	return await Bun.write(key, path)
}
