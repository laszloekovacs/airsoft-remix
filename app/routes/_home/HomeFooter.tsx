import { Box, Flex, Text, Link as RadixLink } from '@radix-ui/themes'
import { Link } from 'react-router'

export const HomeFooter = () => {
	return (
		<div>
			<div>
				<Link to='/'>Kezdőlap</Link>
				<Link to='/user'>Profil</Link>
			</div>

			<small>{new Date().getFullYear()} Airsoft Naptár</small>
		</div>
	)
}
