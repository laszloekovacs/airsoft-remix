import { EditorContent, useEditor } from '@tiptap/react'
import NoSSR from './nossr'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export const TipTapEditor = ({
	defaultValue,
	onChange
}: {
	defaultValue: string
	onChange: (value: string) => void
}) => {
	const editor = useEditor({
		extensions: [
			Image,
			StarterKit.configure({
				heading: {
					levels: [1, 2]
				}
			})
		],
		content: defaultValue,
		onUpdate: ({ editor }) => onChange(editor.getHTML()),
		immediatelyRender: false
	})

	return (
		<NoSSR>
			<EditorContent editor={editor} />
		</NoSSR>
	)
}
