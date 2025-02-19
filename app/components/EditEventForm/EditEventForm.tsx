import { useState } from 'react'

type EventViewModel = {
	title: string
	url: string
}

type FormProps = {
	inititalValues: EventViewModel
}

export function EditEventForm({ inititalValues }: FormProps) {
	const [formState, setFormState] = useState(inititalValues)

	return (
		<form data-testid='form'>
			<label>
				<span>Esemény neve</span>
				<input
					type='text'
					name='title'
					value={formState.title}
					onChange={e => setFormState({ ...formState, title: e.target.value })}
				/>
			</label>
		</form>
	)
}
