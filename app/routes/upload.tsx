import { useLoaderData } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'
import { useRef, useState } from 'react'
import { Database } from '~/supabase'

export const loader = async () => {
	return {
		env: {
			SUPABASE_URL: process.env.SUPABASE_URL!,
			SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
		}
	}
}

export default function Page() {
	const { env } = useLoaderData<typeof loader>()
	const fileref = useRef<HTMLInputElement>(null)
	const [isPending, setPending] = useState(false)

	const upload = async () => {
		const first = fileref.current?.files?.[0]
		if (!first) return

		setPending(true)

		const supabase = createClient<Database>(
			env.SUPABASE_URL,
			env.SUPABASE_ANON_KEY
		)

		const { error } = await supabase.storage
			.from('banners')
			.upload(first.name, first)

		if (error) console.log(error)
		setPending(false)
	}

	return (
		<div>
			<p>upload a file</p>
			<input type='file' ref={fileref} />
			<button onClick={() => upload()}>upload</button>
			{isPending && <p>Uploading...</p>}
		</div>
	)
}
