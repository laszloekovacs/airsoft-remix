import { LocalFileStorage } from '@mjackson/file-storage/local'

export const fileStorage = new LocalFileStorage('./uploads/')

export function getStorageKey(userId: string) {
	return `user-${userId}`
}
