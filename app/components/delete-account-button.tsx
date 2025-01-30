import React from 'react'
import { authClient } from '~/services/auth.client'

const DeleteAccountButton = () => {
	const handleClick = async () => {
		await authClient.deleteUser({
			callbackURL: '/bye'
		})
	}

	return (
		<button className='btn' onClick={handleClick}>
			fiók törlése
		</button>
	)
}

export default DeleteAccountButton
