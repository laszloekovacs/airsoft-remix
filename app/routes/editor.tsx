/**
 * @see https://mdxeditor.dev/
 */

import { MDXEditor } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

const editor = () => {
	return (
		<div>
			<h1>Editor</h1>
			<div className='border-2 p-4'>
				<MDXEditor markdown='' placeholder='Enter your content here' />
			</div>
		</div>
	)
}

export default editor
