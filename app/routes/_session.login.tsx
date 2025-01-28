import { authClient } from '~/services/auth.client'

const LoginPage = () => {
	const handleLogin = async (provider: 'github' | 'discord') => {
		authClient.signIn.social({
			provider: provider,
			newUserCallbackURL: '/welcome'
		})
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-sm shadow-lg w-full max-w-md'>
				<h1 className='text-2xl font-bold text-center mb-6'>Belépés</h1>
				<div className='space-y-4'>
					<button
						className='w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-sm hover:bg-gray-900 transition duration-300'
						onClick={() => handleLogin('github')}>
						Belépés GitHub fiókkal
					</button>

					<button
						className='w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-sm hover:bg-indigo-700 transition duration-300'
						onClick={() => handleLogin('discord')}>
						Belépés Discord fiókkal
					</button>
				</div>
			</div>
			<div className='absolute bottom-4'>
				<h2 className='text-2xl font-semibold'>Airsoft Naptár</h2>
			</div>
		</div>
	)
}

export default LoginPage

/*
	return (
		<div>
			<h1>Bejelentkezés</h1>
			<button onClick={() => handleLogin('github')}>belépés github fiókkal</button>
			<br />
			<button onClick={() => handleLogin('discord')}>belépés discord fiókkal</button>
		</div>
	)
}

export default LoginPage
*/
