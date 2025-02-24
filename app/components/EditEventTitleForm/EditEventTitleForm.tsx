import { Form } from "react-router"


export const EditEventTitleForm = ({ eventTitle }: { eventTitle: string }) => {
    const { title, } = useEventTitle(eventTitle)

    return (
        <div>
            <Form>
                <label htmlFor="title">Esemény neve</label>
                <input id="title" type="text" name="title" />
            </Form>
            <p id="generated-url">generated url</p>
        </div>
    )
}

