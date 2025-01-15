export const storage_write = async (key: string, attachment: File) => {
	const content_basepath = './upload/content/'
	const path = content_basepath + key

	const bytes = await Bun.write(path, attachment)
	return bytes
}
