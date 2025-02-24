import type { Route } from './+types/_home.event.($eventUrl).edit'

const loader = async ({ params, request }: Route.ActionArgs) => {

}

export default function EventEditPage({ loaderData }: Route.ComponentProps) {


	return (
		<div>
			<h1>Esemény szerkesztése</h1>
		</div>
	)
}
