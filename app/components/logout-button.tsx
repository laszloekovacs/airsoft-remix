import { useNavigate } from 'react-router'
import { authClient } from '~/services/auth.client'

export default function LogoutButton() {
	const navigate = useNavigate()

	const handleClick = async () => {
		await authClient.signOut()
		navigate('/bye')
	}

	return <button onClick={() => handleClick()}>Logout</button>
}
