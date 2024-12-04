import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	test: {
		globals: true,
		include: ['**/*.test.{ts,tsx}'],
		exclude: ['node_modules', 'dist'],
		environment: 'node'
	},
	plugins: [
		tsconfigPaths(),
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				v3_singleFetch: true
			},
			ignoredRouteFiles: ['**/*.css', '**/*.test.{js,jsx,ts,tsx}']
		})
	],
	server: {
		port: 3000
	}
})
