import { Link, useNavigate } from 'react-router'
import { authClient } from '~/lib/auth.client'

type Props = {
	userEmail: string | null
	imageUrl: string | null
}

export const SessionMenuButton = ({ userEmail, imageUrl }: Props) => {
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

	if (userEmail) {
		return (
			<div>
				<button
					popoverTarget='session-menu'
					className='flex items-center space-x-2'>
					<p>{userEmail}</p>
					{imageUrl && <img src={imageUrl} alt='user' className='w-10' />}
				</button>

				<div popover='auto' id='session-menu'>
					<p>{userEmail}</p>
					<Link to='/user/me'>profil</Link>
					<hr />
					<button onClick={() => signout()}>kilép</button>
				</div>
			</div>
		)
	} else {
		return (
			<div>
				<Link to='/login'>bejelentkezés</Link>
			</div>
		)
	}
}
