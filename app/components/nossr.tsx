import React from 'react'

export default function NoSSR({ children }: { children: React.ReactNode }) {
	const [isClient, setIsClient] = React.useState(false)

	React.useEffect(() => {
		setIsClient(true)
	}, [])

	return isClient && <>{children}</>
}
