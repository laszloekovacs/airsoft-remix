import React from 'react'
import { useState } from 'react'

// an id, and the name of the group it belongs to
type ItemType = {
	id: string
	group: string
}

type GroupsContextType = {
	items: ItemType[]
	setItems: React.Dispatch<React.SetStateAction<ItemType[]>>
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
	handleDragOver: (e: React.DragEvent<HTMLDivElement>, id: string) => void
	handleDrop: (e: React.DragEvent<HTMLDivElement>, id: string) => void
}

const GroupsContext = React.createContext<GroupsContextType | null>(null)

export const useGroups = () => {
	const context = React.useContext(GroupsContext)
	if (!context) {
		throw new Error('useGroups must be used within a GroupsContainer')
	}

	return context
}

type GroupsContainerProps = {
	items: ItemType[]
	children: React.ReactNode
}

export const GroupsContainer: React.FC<GroupsContainerProps> = props => {
	const [items, setItems] = useState(props.items)

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
		e.preventDefault()
		e.dataTransfer.setData('id', id)
		console.log('drag start')
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
		e.preventDefault()
		console.log('drag over')
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>, id: string) => {
		e.preventDefault()
		console.log('drop')
	}

	const context: GroupsContextType = {
		items,
		setItems,
		handleDragStart,
		handleDragOver,
		handleDrop
	}

	return <GroupsContext value={context}>{props.children}</GroupsContext>
}

type GroupProps = {
	groupId: string
	children: React.ReactNode
}

export const Group: React.FC<GroupProps> = props => {
	const { handleDragOver, handleDrop } = useGroups()

	return <div onDrop={e => handleDrop(e, props.groupId)}>{props.children}</div>
}

type GroupItemProps = {
	itemId: string
	children: React.ReactNode
}

export const GroupItem: React.FC<GroupItemProps> = props => {
	const { handleDragStart } = useGroups()

	return (
		<div draggable onDragStart={e => handleDragStart(e, props.itemId)}>
			{props.children}
		</div>
	)
}
