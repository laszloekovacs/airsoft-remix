import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<RemixBrowser />
		</StrictMode>,
		{
			onRecoverableError(error, errorInfo) {
				console.error('error in client, hydrateroot', error)
				console.error(errorInfo)
			}
		}
	)
})
