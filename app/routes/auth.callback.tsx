import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { createServerSupabaseClient } from '~/lib/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { supabase, headers } = createServerSupabaseClient(request)
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	// the user is redirected here after social login

	// if the user isn't signed in but somehow stumbled uppon this page, redirect him to login
	if (error || !user) {
		return redirect('/login')
	}

	// he has an account, its filled out nicely, return him to home, or where he was
	const { data: account, error: accountError } = await supabase
		.from('accounts')
		.select('name')
		.eq('id', user.id)
		.single()

	// todo: check with zod or similar, empty string is still an object ergo truthy
	if (account && account.name) {
		return redirect('/')
	}

	// he has no account.name, send him to onboarding
	return redirect('/auth/onboarding')
}

const OnboardingPage = () => {
	return <div>OnboardPage</div>
}

export default OnboardingPage

// show for users who's 'user' entry is not filled in yet
// make it possible to delete and log out
