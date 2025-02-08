import type { auth } from '~/services/auth.server'
import Avatar from './avatar'
import { Link } from 'react-router'
import { authClient } from '~/services/auth.client'

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
			<div className='flex flex-row gap-2 justify-end items-center'>
				<p className='overflow-hidden text-ellipsis'>
					{sessionData.user.email}
				</p>
				<Avatar src={sessionData.user.image} />
			</div>
		</Link>
	)
}

const UnauthenticatedSessionHeader = () => {
	const handleClick = (provider: 'github' | 'discord') => {
		authClient.signIn.social({ provider, newUserCallbackURL: '/welcome' })
	}

	return (
		<section>
			<p>belépés / felíratkozás</p>

			<div>
				<button onClick={() => handleClick('github')}>
					<img src='/assets/github-fill.svg' alt='github' width={30} />
				</button>
				<button onClick={() => handleClick('discord')}>
					<img src='/assets/discord-fill.svg' alt='discord' width={30} />
				</button>
			</div>
		</section>
	)
}
