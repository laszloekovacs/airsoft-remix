import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import NoSSR from '~/components/nossr'

export default function App() {
	const [value, setValue] = React.useState('**Hello world!!!**')
	return (
		<NoSSR>
			<MDEditor value={value} onChange={setValue} />
			<MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
		</NoSSR>
	)
}
