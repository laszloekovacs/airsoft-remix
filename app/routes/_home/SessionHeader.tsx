import type { auth } from '~/services/auth.server'

import { Link } from 'react-router'
import { authClient } from '~/services/auth.client'
import { Avatar, Box, Button, Flex, Text } from '@radix-ui/themes'

type sessionType = Awaited<ReturnType<typeof auth.api.getSession>>

export default function SessionHeader({
	sessionData
}: {
	sessionData?: sessionType
}) {
	{
		return sessionData ? (
			<AuthenticatedSessionHeader sessionData={sessionData} />
		) : (
			<UnauthenticatedSessionHeader />
		)
	}
}

const AuthenticatedSessionHeader = ({
	sessionData
}: {
	sessionData: sessionType
}) => {
	if (!sessionData)
		throw new Error('sessionData should not be null at this point')

	return (
		<Link to='/user'>
			<Avatar src={sessionData.user.image} fallback='U' />
		</Link>
	)
}

const UnauthenticatedSessionHeader = () => {
	const handleClick = (provider: 'github' | 'discord') => {
		authClient.signIn.social({ provider, newUserCallbackURL: '/welcome' })
	}

	return (
		<div>
			<Text>belépés / felíratkozás</Text>

			<Flex gap='2'>
				<Button onClick={() => handleClick('github')}>
					<img src='/assets/github-fill.svg' alt='github' width={30} />
				</Button>
				<Button onClick={() => handleClick('discord')}>
					<img src='/assets/discord-fill.svg' alt='discord' width={30} />
				</Button>
			</Flex>
		</div>
	)
}
