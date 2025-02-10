import { Button, Flex, Text } from '@radix-ui/themes'
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
			<Flex gap='2'>
				<Text>{value}</Text>
				<Button size='1' onClick={() => setEditing(true)}>
					edit
				</Button>
			</Flex>
		)
	} else {
		return (
			<>
				<form onSubmit={handleDoneEditing}>
					<input name='text' defaultValue={value} />
					<Button size='1' asChild>
						<input type='submit' value='save' />
					</Button>
					<Button size='1' onClick={() => setEditing(false)}>
						x
					</Button>
				</form>
			</>
		)
	}
}
