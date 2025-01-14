import { useNavigate } from 'react-router'
import { authClient } from '~/lib/auth.client'

type Props = {
	userEmail: string | null
	imageUrl: string | null
}

export const SessionMenuButton = ({ userEmail, imageUrl }: Props) => {
	const navigator = useNavigate()

	const signIn = async () => {
		authClient.signIn.social({
			provider: 'github',
			newUserCallbackURL: '/welcome'
		})
	}

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
				<button onClick={() => signout()}>{userEmail}</button>
			</div>
		)
	} else {
		return (
			<div>
				<button onClick={signIn}>Bejeletkezés</button>
			</div>
		)
	}
}
