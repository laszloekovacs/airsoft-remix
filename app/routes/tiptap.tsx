import NoSSR from '~/components/nossr'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {
	useEditor,
	EditorContent,
	FloatingMenu,
	BubbleMenu
} from '@tiptap/react'

const markdown = `
Image without dimensions:
![](https://picsum.photos/200/300)
Image with dimensions:
<img src="https://picsum.photos/200/300" width="100" height="150" />
`

export default function RawDataPage() {
	return <TipTapEditor />
}

export const TipTapEditor = () => {
	const editor = useEditor({
		extensions: [
			Image,
			StarterKit.configure({
				heading: {
					levels: [1, 2]
				}
			})
		],
		content: markdown,
		immediatelyRender: false
	})

	return (
		<NoSSR>
			<EditorContent editor={editor} />
			<FloatingMenu editor={editor}>floating menu</FloatingMenu>
			<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
		</NoSSR>
	)
}
