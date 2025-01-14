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
				{imageUrl && <img src={imageUrl} alt='user' className='w-10' />}
				<p>{userEmail}</p>
				<button onClick={() => signout()}>kilép</button>
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
