import { authClient } from '~/lib/auth.client'

const LoginPage = () => {
	const signIn = async (provider: 'github' | 'discord') => {
		authClient.signIn.social({
			provider: provider,
			newUserCallbackURL: '/welcome'
		})
	}

	return (
		<div>
			<h1>Bejelentkezés</h1>
			<button onClick={() => signIn('github')}>belépés github fiókkal</button>
			<br />
			<button onClick={() => signIn('discord')}>belépés discord fiókkal</button>
		</div>
	)
}

export default LoginPage
