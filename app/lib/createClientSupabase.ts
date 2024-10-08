import { createClient } from '@supabase/supabase-js'
import { Database } from '~/supabase'

export const createClientSupabase = () => {
	if (
		!import.meta.env.VITE_SUPABASE_URL ||
		!import.meta.env.VITE_SUPABASE_ANON_KEY
	) {
		throw new Error('supabase client cant init')
	}

	const supabase = createClient<Database>(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY!
	)

	return supabase
}
