import { useOutletContext } from '@remix-run/react'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Login, Logout } from '~/components/Login'
import { OutletContext } from '~/root'

const DebugPage = () => {
	const { supabase } = useOutletContext<OutletContext>()
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})
	}, [supabase])

	return (
		<div>
			<h1>Debug Page</h1>

			<div>
				<Login />

				<Logout />
			</div>
			<hr />
			{session && <pre>{JSON.stringify(session.user, null, 2)}</pre>}
		</div>
	)
}

export default DebugPage
