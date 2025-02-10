import { Heading, Link as RadixLink } from '@radix-ui/themes'
import { Link } from 'react-router'

export function PageLogo() {
	return (
		<RadixLink asChild>
			<Link to='/'>
				<Heading>Airsoft Naptár</Heading>
			</Link>
		</RadixLink>
	)
}
