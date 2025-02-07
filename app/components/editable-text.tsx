import { useState } from 'react'

export const EditableText = ({
	value,
	onSave
}: {
	value: string
	onSave?: (value: string) => void
}) => {
	const [isEditing, setEditing] = useState(false)

	const handleDoneEditing = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const text = formData.get('text') as string

		onSave?.(text)
		setEditing(false)
	}

	if (!isEditing) {
		return (
			<>
				<span>{value}</span>
				<button onClick={() => setEditing(true)}>edit</button>
			</>
		)
	} else {
		return (
			<>
				<form onSubmit={handleDoneEditing}>
					<input name='text' defaultValue={value} />
					<input type='submit' value='save' />
					<button onClick={() => setEditing(false)}>x</button>
				</form>
			</>
		)
	}
}
