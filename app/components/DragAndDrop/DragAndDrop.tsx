import { createContext, useState } from 'react'

const DragAndDropContext = createContext({})

type DragAndDropContainer = {
	children: React.ReactNode
}

export const DragAndDropContainer = ({ children }: DragAndDropContainer) => {
	const [state, setState] = useState({})

	return (
		<DragAndDropContext.Provider value={state}>
			{children}
		</DragAndDropContext.Provider>
	)
}
