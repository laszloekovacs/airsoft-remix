import { useState } from 'react'

type EventModel = {
	name: string
	url: string
}

type FormProps = {
	intitalValues: EventModel
}

export function EditEventForm({ intitalValues }: FormProps) {
	const [formState, setFormState] = useState(intitalValues)

	return (
		<form data-testid='form'>
			<label>
				<span>Esemény neve</span>
				<input
					type='text'
					name='name'
					value={formState.name}
					onChange={e => setFormState({ ...formState, name: e.target.value })}
				/>
			</label>
		</form>
	)
}
