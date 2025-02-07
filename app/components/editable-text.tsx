import { useState } from 'react'

export const EditableText = ({
	value,
	onChange
}: {
	value: string
	onChange?: (value: string) => void
}) => {
	const [isEditing, setEditing] = useState(false)
	const [editingValue, setEditingValue] = useState(value)

	const handleDoneEditing = () => {
		if (onChange) onChange(editingValue)
		setEditing(false)
	}

	if (!isEditing) {
		return (
			<div>
				<span>{value}</span>
				<button onClick={() => setEditing(true)}>edit</button>
			</div>
		)
	} else {
		return (
			<div>
				<form onSubmit={handleDoneEditing}>
					<input
						value={editingValue}
						onChange={e => setEditingValue(e.target.value)}
					/>
					<button onClick={() => handleDoneEditing()}>save</button>
					<button onClick={() => setEditing(false)}>cancel</button>
				</form>
			</div>
		)
	}
}
