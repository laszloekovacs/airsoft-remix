import { authClient } from '~/lib/auth.client'

const LoginPage = () => {
	const signIn = async () => {
		authClient.signIn.social({
			provider: 'github',
			newUserCallbackURL: '/welcome'
		})
	}

	return (
		<div>
			<h1>Bejelentkezés</h1>
			<button onClick={() => signIn()}>belépés github fiókkal</button>
		</div>
	)
}

export default LoginPage
