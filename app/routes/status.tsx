import { useState } from 'react'
import { EditableText } from '~/components/editable-text'

export default function TestingPage() {
	const [text, setText] = useState('test')

	return (
		<div>
			<p>teszteles</p>
			<EditableText
				value={text}
				onChange={value => {
					setText(value)
				}}
			/>
		</div>
	)
}
