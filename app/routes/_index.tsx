import { Link } from 'react-router'
import type { Route } from './+types/_index'
import { SessionMenuButton } from '~/components/sessionmenu'
import PageFooter from '~/components/pagefooter'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Airsoft Naptár' },
		{ name: 'description', content: 'Airsoft esemény naptár' }
	]
}

export default function Home() {
	return (
		<div>
			<Link to='/'>
				<h1>Airsoft Naptár</h1>
			</Link>

			<div></div>

			<div>
				<SessionMenuButton />
			</div>
			<PageFooter />
		</div>
	)
}
