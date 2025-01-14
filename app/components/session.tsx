import { authClient } from '~/lib/auth.client'

export const SessionMenuButton = ({ username }: { username: string }) => {
	//const { data, isPending, error } = useSession()

	const signIn = async () => {
		authClient.signIn.social({
			provider: 'github',
			newUserCallbackURL: '/welcome'
		})
	}

	if (username) {
		return (
			<div>
				<button onClick={() => authClient.signOut()}>{username}</button>
			</div>
		)
	}

	return (
		<div>
			<button onClick={signIn}>Bejeletkezés</button>
		</div>
	)
}
