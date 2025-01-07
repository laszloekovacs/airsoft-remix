import type { Route } from './+types/_home._index'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export default function Home() {
	return (
		<div>
			<p>index</p>
		</div>
	)
}
