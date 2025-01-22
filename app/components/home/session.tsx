import { Link, useNavigate } from 'react-router'
import { authClient } from '~/lib/auth.client'
import styles from './session.module.css'

type Props = {
	userEmail: string | null
	imageUrl: string | null
}

export const SessionMenuButton = ({ userEmail, imageUrl }: Props) => {
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
	return (
		<div>
			<Link to='/login'>bejelentkezés</Link>
		</div>
	)
}

const LoggedIn = ({
	userEmail,
	imageUrl
}: {
	userEmail: string
	imageUrl: string | null
}) => {
	const navigator = useNavigate()

	const signout = async () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigator('/bye')
				}
			}
		})
	}
	return (
		<div className={styles.sessionMenuContainer}>
			<button popoverTarget='session-menu'>
				{imageUrl && <img src={imageUrl} alt='user' className='avatar' />}
			</button>

			<div popover='auto' id='session-menu' className={styles.sessionMenu}>
				<p>{userEmail}</p>
				<Link to='/user/me'>profil</Link>
				<hr />
				<button onClick={() => signout()}>kilép</button>
			</div>
		</div>
	)
}
