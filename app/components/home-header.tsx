import { Link, useNavigate } from 'react-router'
import Avatar from './avatar'

type HeaderProps = {
	userEmail: string | null
	userProfileUrl: string | null
	isOrganizer: boolean
}

export function Header({
	userEmail,
	userProfileUrl,
	isOrganizer
}: HeaderProps) {
	return (
		<header>
			<div>
				<Link to='/'>
					<h1>Airsoft Naptár</h1>
				</Link>
				<SessionMenuButton userEmail={userEmail} imageUrl={userProfileUrl} />
			</div>
			{isOrganizer && <OrganizerPanel />}
		</header>
	)
}

const OrganizerPanel = () => {
	return (
		<div>
			<Link to='/dashboard'>szervezői oldal</Link>
		</div>
	)
}

type SessionProps = {
	userEmail: string | null
	imageUrl: string | null
}

export const SessionMenuButton = ({ userEmail, imageUrl }: SessionProps) => {
	return (
		<>
			{userEmail ? (
				<LoggedIn userEmail={userEmail} imageUrl={imageUrl} />
			) : (
				<LoggedOff />
			)}
		</>
	)
}

const LoggedOff = () => {
	return <Link to='/login'>bejelentkezés</Link>
}

const LoggedIn = ({
	userEmail,
	imageUrl
}: {
	userEmail: string
	imageUrl: string | null
}) => {
	return (
		<Link to='/user/me' className='flex flex-row gap-2 items-center'>
			<span>{userEmail}</span>
			<Avatar src={imageUrl} alt={userEmail} />
		</Link>
	)
}
