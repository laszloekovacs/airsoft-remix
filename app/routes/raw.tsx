import {
	useEditor,
	EditorContent,
	FloatingMenu,
	BubbleMenu
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]
const content = '<p>Hello world</p>'

export default function RawDataPage() {
	return <Editor />
}

export const Editor = () => {
	const editor = useEditor({
		extensions,
		content,
		immediatelyRender: false
	})

	return (
		<>
			<EditorContent editor={editor} />
		</>
	)
}
