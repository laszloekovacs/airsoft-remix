import React, { useEffect, useRef, useState } from 'react'
import '@mdxeditor/editor/style.css'
import {
	MDXEditor,
	headingsPlugin,
	markdownShortcutPlugin,
	type MDXEditorMethods
} from '@mdxeditor/editor'

export default function MdxPage() {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return isClient && <Editor />
}

const Editor = () => {
	const ref = useRef<MDXEditorMethods>(null)

	return (
		<div>
			<button onClick={() => ref.current?.setMarkdown('hello')}>tbn</button>
			<MDXEditor
				ref={ref}
				markdown='bye'
				plugins={[headingsPlugin(), markdownShortcutPlugin()]}
			/>
		</div>
	)
}
