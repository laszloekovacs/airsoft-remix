import type { Route } from './+types/seed'

export const loader = async ({ request }: Route.LoaderArgs) => {}

export default function SeedingPage({ loaderData }: Route.ComponentProps) {
	return <div>SeedingPage</div>
}
