type EventModel = {
	name: string
	url: string
}

type FormProps = {
	intitalValues: EventModel
}

export function EditEventForm({ intitalValues }: FormProps) {
	return <form data-testid='form'>EditEventForm</form>
}
