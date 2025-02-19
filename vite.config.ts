/// <reference types="vitest" />
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
	server: {
		port: 3000,
		host: '0.0.0.0'
	},
	test: {
		globals: true,
		environment: 'happy-dom'
	}
})
