import { authClient } from '~/lib/auth.client'

export function SessionMenuButton() {
	const signIn = async () => {
		authClient.signIn.social({
			provider: 'github',
			newUserCallbackURL: '/welcome'
		})
	}

	return (
		<>
			<button onClick={signIn}>Bejeletkezés</button>
		</>
	)
}
