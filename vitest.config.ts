import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['*.test.{ts,tsx}'],
		exclude: ['node_modules', 'dist']
	},
	define: {
		'import.meta.vitest': 'undefined'
	}
})
