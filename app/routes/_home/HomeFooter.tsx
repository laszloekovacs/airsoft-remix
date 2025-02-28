import { Box, Flex, Text, Link as RadixLink } from '@radix-ui/themes'
import { Link } from 'react-router'

export const HomeFooter = () => {
	return (
		<Box py='4'>
			<Flex gap='2' direction='column' pb='4'>
				<RadixLink asChild>
					<Link to='/'>Kezdőlap</Link>
				</RadixLink>
				<RadixLink asChild>
					<Link to='/user'>Profil</Link>
				</RadixLink>
			</Flex>

			<Text size='1' weight='light'>
				{new Date().getFullYear()} Airsoft Naptár
			</Text>
		</Box>
	)
}
