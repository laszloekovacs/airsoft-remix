import { Link, useNavigate } from 'react-router'
import Avatar from './avatar'

type HeaderProps = {
	userEmail: string
	userProfileUrl?: string
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
	imageUrl?: string
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
	imageUrl?: string
}) => {
	return (
		<Link to='/user/me'>
			<span>{userEmail}</span>
			<Avatar src={imageUrl} alt={userEmail} />
		</Link>
	)
}
