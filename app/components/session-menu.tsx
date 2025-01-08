import { authClient } from '~/lib/auth.client'

export function SessionMenuButton() {
	const signIn = async () => {
		authClient.signIn.social({
			provider: 'github'
		})
	}

	return (
		<>
			<button onClick={signIn}>Session</button>
		</>
	)
}
