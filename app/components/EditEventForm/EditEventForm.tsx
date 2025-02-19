import { useState } from 'react'

type EventViewModel = {
	title: string
	url: string
	description: string
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

			<label>
				<span>Esemény generált URL-je</span>
				<output>{formState.url}</output>
			</label>

			<label>
				<span>Esemény leírása</span>
				<textarea
					name='description'
					value={formState.description}
					onChange={e =>
						setFormState({ ...formState, description: e.target.value })
					}></textarea>
			</label>
		</form>
	)
}
