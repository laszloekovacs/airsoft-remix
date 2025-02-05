import {
	BoldItalicUnderlineToggles,
	InsertImage,
	MDXEditor,
	UndoRedo,
	headingsPlugin,
	imagePlugin,
	listsPlugin,
	markdownShortcutPlugin,
	toolbarPlugin,
	type MDXEditorMethods
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useRef } from 'react'
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
	const markdown = `
Image without dimensions:
![](https://picsum.photos/200/300)
Image with dimensions:
<img src="https://picsum.photos/200/300" width="100" height="150" />
`

	return (
		<div>
			<button onClick={() => ref.current?.setMarkdown('hello')}>tbn</button>
			<MDXEditor
				ref={ref}
				markdown={markdown}
				plugins={[
					headingsPlugin(),
					listsPlugin(),
					imagePlugin(),

					markdownShortcutPlugin(),
					toolbarPlugin({
						toolbarClassName: 'toolbar',
						toolbarContents: () => (
							<>
								<UndoRedo />
								<BoldItalicUnderlineToggles />
								<InsertImage />
							</>
						)
					})
				]}
			/>
		</div>
	)
}
