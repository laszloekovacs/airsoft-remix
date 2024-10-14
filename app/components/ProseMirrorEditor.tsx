import { baseKeymap } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useEffect, useRef } from 'react'

// Define ProseMirrorEditor component
const ProseMirrorEditor = () => {
	const editorRef = useRef(null) // Ref to hold the editor DOM element
	const viewRef = useRef<EditorView | null>(null) // Ref to hold the editor view instance

	useEffect(() => {
		const state = EditorState.create({
			schema,
			plugins: [
				history(),
				keymap({
					'Mod-z': undo,
					'Mod-y': redo
				}),
				keymap(baseKeymap)
			]
		})

		viewRef.current = new EditorView(editorRef.current, {
			state
		})

		// Cleanup on component unmount
		return () => {
			if (viewRef.current) {
				viewRef.current.destroy()
			}
		}
	}, [])

	const handleRead = () => {
		console.log(JSON.stringify(viewRef.current?.state.doc.toJSON()))
	}

	return (
		<div>
			<div ref={editorRef} />

			<button onClick={handleRead}>Print</button>
		</div>
	)
}

export default ProseMirrorEditor
