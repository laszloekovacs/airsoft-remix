import { type RouteConfig } from '@react-router/dev/routes'
import { flatRoutes } from '@react-router/fs-routes'

export default flatRoutes({
	ignoredRouteFiles: [
		'**/*.module.css',
		'**/*.test.ts',
		'**/*.test.tsx',
		'**/*.spec.ts',
		'**/*.spec.tsx'
	]
}) satisfies RouteConfig
