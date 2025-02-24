import type { Route } from "./+types/_home.event.($eventUrl).edit._index"

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    return { user: "mike" }
}

export default function EventEditIndexPage({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData
    return <div>{user}</div>
}
