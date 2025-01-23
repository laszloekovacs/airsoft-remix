import { Link, useNavigate } from 'react-router'

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
		<header className='flex flex-col p-4'>
			<div className='flex flex-row justify-between'>
				<Link to='/' className='text-2xl font-bold pb-2'>
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
		<div className='flex flex-row justify-between bg-indigo-100 p-2 border-1 rounded-sm'>
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
			{imageUrl && (
				<img src={imageUrl} alt='avatar' className='w-8 h-8 rounded-xs' />
			)}
		</Link>
	)
}
