import type { Route } from './+types/_home.event.($eventUrl).edit'

export const loader = async ({ params, request }: Route.ActionArgs) => {
	return {
		user: "mike"
	}
}

export default function EventEditPage({ loaderData }: Route.ComponentProps) {
	const user = loaderData.user

	return (
		<div>
			<h1>Esemény szerkesztése</h1>
		</div>
	)
}
