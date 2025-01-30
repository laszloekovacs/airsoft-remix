import React from 'react'
import { authClient } from '~/services/auth.client'
import { useNavigate } from 'react-router'

export default function BackButton() {
	const navigate = useNavigate()

	return (
		<div>
			<button onClick={() => navigate(-1)}>vissza</button>
		</div>
	)
}
