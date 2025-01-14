import { useNavigate } from 'react-router'
import { authClient } from '~/lib/auth.client'

type Props = {
	username: string | null
}

export const SessionMenuButton = ({ username }: Props) => {
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

	if (username) {
		return (
			<div>
				<button onClick={() => signout()}>{username}</button>
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
