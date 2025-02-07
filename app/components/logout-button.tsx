import { useNavigate } from 'react-router'
import { authClient } from '~/services/auth.client'

export default function LogoutButton() {
	const navigate = useNavigate()

	const handleClick = async () => {
		await authClient.signOut()
		navigate('/bye')
	}

	return (
		<button className='btn btn-primary' onClick={() => handleClick()}>
			kijelentkezés
		</button>
	)
}
