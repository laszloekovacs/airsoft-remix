import { useState } from 'react'

type EventViewModel = {
	title: string
	url: string
	description: string
	startDate: Date
	coverPhoto: string
	isPublished: boolean
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

			<label>
				<span>Esemény időpontja</span>
				<input
					type='date'
					name='startDate'
					value={formState.startDate.toISOString().split('T')[0]}
					onChange={e =>
						setFormState({ ...formState, startDate: new Date(e.target.value) })
					}></input>
			</label>

			<label>
				<span>Esemény képe</span>
				<input type='file' name='coverPhoto' accept='image/*'></input>
			</label>

			<label>
				<span>Esemény megjelenítése</span>
				<input
					type='checkbox'
					name='isPublished'
					checked={formState.isPublished}
					onChange={e =>
						setFormState({ ...formState, isPublished: e.target.checked })
					}
				/>
			</label>

			<input type='submit' value='mentés' />
		</form>
	)
}
