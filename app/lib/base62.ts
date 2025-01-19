export function encodeBase62(num: number) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = ''
	while (num > 0) {
		result = chars[num % 62] + result
		num = Math.floor(num / 62)
	}
	return result || '0'
}

export function decodeBase62(str: string) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return str.split('').reduce((acc, char) => acc * 62 + chars.indexOf(char), 0)
}
