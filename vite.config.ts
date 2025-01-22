import { reactRouter } from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import customMediaQuery from 'postcss-custom-media'

export default defineConfig({
	css: {
		postcss: {
			plugins: [autoprefixer, customMediaQuery]
		}
	},
	plugins: [reactRouter(), tsconfigPaths()],
	server: {
		port: 3000,
		host: '0.0.0.0'
	}
})
