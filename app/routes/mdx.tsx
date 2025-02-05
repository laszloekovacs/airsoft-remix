import React, { useEffect, useRef, useState } from 'react'
import '@mdxeditor/editor/style.css'
import {
	MDXEditor,
	headingsPlugin,
	markdownShortcutPlugin,
	type MDXEditorMethods
} from '@mdxeditor/editor'
import NoSSR from '~/components/nossr'

export default function MdxPage() {
	return (
		<NoSSR>
			<Editor />
		</NoSSR>
	)
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
