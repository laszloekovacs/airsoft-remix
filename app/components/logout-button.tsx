import { Button } from '@radix-ui/themes'
import { useNavigate } from 'react-router'
import { authClient } from '~/services/auth.client'

export default function LogoutButton() {
	const navigate = useNavigate()

	const handleClick = async () => {
		await authClient.signOut()
		navigate('/bye')
	}

	return <Button onClick={() => handleClick()}>kijelentkezés</Button>
}
