import { LoaderFunctionArgs } from '@remix-run/node'
import { createServerSupabaseClient } from '~/lib/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)

	// the user is redirected here after social login,
	// the db automatically creates the user, we give him a chance
	// to reconsider and delete it

	const {
		data: { user }
	} = await supabase.auth.getUser()

	return new Response(
		{},
		{
			headers
		}
	)
}

const OnboardingPage = () => {
	return <div>OnboardPage</div>
}

export default OnboardingPage

// show for users who's 'user' entry is not filled in yet
// make it possible to delete and log out
