import ProseMirrorEditor from '~/components/ProseMirrorEditor'

const editor = () => {
	return (
		<div>
			<h1>Editor</h1>
			<div className='border-2 p-4'>
				<ProseMirrorEditor />
			</div>
		</div>
	)
}

export default editor
