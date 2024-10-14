import { EditorState } from 'prosemirror-state'
import ProseMirrorEditor from '~/components/ProseMirrorEditor'

export default function EditPage() {
	return (
		<div>
			<h2>Edit</h2>
			<ProseMirrorEditor />
		</div>
	)
}
