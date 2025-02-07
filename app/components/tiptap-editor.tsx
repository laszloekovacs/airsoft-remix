import { EditorContent, useEditor } from '@tiptap/react'
import NoSSR from './nossr'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export const TipTapEditor = ({ content }: { content: string }) => {
	const editor = useEditor({
		extensions: [
			Image,
			StarterKit.configure({
				heading: {
					levels: [1, 2]
				}
			})
		],
		content,
		immediatelyRender: false
	})

	return (
		<NoSSR>
			<EditorContent editor={editor} />
		</NoSSR>
	)
}
