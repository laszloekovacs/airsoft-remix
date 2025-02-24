import { Form, useFetcher } from "react-router"
import type { Route } from "./+types/_home.event.($eventUrl).edit._index"
import { getSession } from "~/services/auth.server"
import { useCallback, useRef, useState } from "react"
import { drizzleClient } from "~/services/db.server"
import { event } from "~/schema"
import { eq } from "drizzle-orm"
import { debounce } from "lodash"


export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const sessionCookie = await getSession(request)
    if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })


    if (params.eventUrl) {
        const result = await drizzleClient.select().from(event).where(eq(event.url, params.eventUrl))

        return { url: params.eventUrl, title: result[0].title }
    }

    // return the events url and title or empty string if not found
    return { url: "", title: "" }
}

export default function EventEditIndexPage({ loaderData }: Route.ComponentProps) {
    const [url, setUrl] = useState(loaderData.url)
    const [title, setTitle] = useState(loaderData.title)

    const fetcher = useFetcher()



    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <fetcher.Form method="post">
            <label htmlFor="title">Esemény neve</label>
            <input id="title" type="text" name="title" value={title} onChange={handleChange} />

            <p>{url}</p>

            {fetcher.state === "submitting" ? "Submitting..." : ""}
        </fetcher.Form>
    )
}


export const action = async ({ request }: Route.ActionArgs) => {
    const sessionCookie = await getSession(request)
    if (!sessionCookie) throw new Response('Unauthorized', { status: 401 })

    const formData = await request.formData()
    const title = formData.get('title')

    console.log("title", title)

    if (!title) {
        return { url: "" }
    }

    return { url: title }
}
