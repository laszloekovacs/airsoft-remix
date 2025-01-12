import { authClient } from '~/lib/auth.client'

export const SessionMenuButton = () => {
	//const { data, isPending, error } = useSession()

	const signIn = async () => {
		authClient.signIn.social({
			provider: 'github',
			newUserCallbackURL: '/welcome'
		})
	}

	return (
		<div>
			<button onClick={signIn}>Bejeletkezés</button>
		</div>
	)
}
