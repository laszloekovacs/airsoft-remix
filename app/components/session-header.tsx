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
	if (!sessionData) throw new Error('session should not be null at this point')

	return (
		<div>
			<Link to='/user/me'>
				<p>{sessionData.user.email}</p>
				<Avatar />
			</Link>
		</div>
	)
}

const UnauthenticatedSessionHeader = () => {
	const handleClick = (provider: 'github' | 'discord') => {
		authClient.signIn.social({ provider, newUserCallbackURL: '/welcome' })
	}

	return (
		<div>
			<div>
				<p>belépés / csatlakozás</p>
			</div>

			<div>
				<button onClick={() => handleClick('github')}>
					<img src='/assets/github-fill.svg' alt='github' width={30} />
				</button>
				<button onClick={() => handleClick('discord')}>
					<img src='/assets/discord-fill.svg' alt='discord' width={30} />
				</button>
			</div>
		</div>
	)
}
