import { json, Link, useOutletContext } from '@remix-run/react'
import React from 'react'
import { OutletContext } from '~/root'

export const loader = () => {
	return json({
		data: 'hello'
	})
}

export default function ProfilePage() {
	return (
		<div>
			<h1>Profile</h1>
		</div>
	)
}

/*
- connect to supabase
- get users profile picture, name


*/
