import { TipTapEditor } from '~/components/tiptap-editor'

const markdown = `
Image without dimensions:
![](https://picsum.photos/200/300)
Image with dimensions:
<img src="https://picsum.photos/200/300" width="100" height="150" />
`

export default function RawDataPage() {
	return <TipTapEditor content={markdown} />
}

// https://tiptap.dev/docs/editor/getting-started/install/react
