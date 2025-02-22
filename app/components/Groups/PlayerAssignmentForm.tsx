import React from 'react'
import { useState } from 'react'

// an id, and the name of the group it belongs to
type ItemType = {
	id: string
	group: string
}

type GroupsContextType = {
	groups: string[]
	items: ItemType[]
	setItems: React.Dispatch<React.SetStateAction<ItemType[]>>
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, itemId: string) => void
	handleDragOver: (e: React.DragEvent<HTMLDivElement>, groupId: string) => void
	handleDrop: (e: React.DragEvent<HTMLDivElement>, groupId: string) => void
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

	const allGroups = items.map(item => item.group || 'none')
	const groups = [...new Set(allGroups)]

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		itemId: string
	) => {
		e.dataTransfer.setData('text/plain', itemId)
	}

	const handleDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		groupId: string
	) => {
		e.preventDefault()
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>, groupId: string) => {
		const id = e.dataTransfer.getData('text/plain')

		const rest = items.filter(item => item.id != id)
		const item = items.find(item => item.id == id)
		if (item) {
			setItems([...rest, { ...item, group: groupId }])
		}

		e.preventDefault()
	}

	const context: GroupsContextType = {
		groups,
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

	return (
		<div
			onDrop={e => handleDrop(e, props.groupId)}
			onDragOver={e => handleDragOver(e, props.groupId)}>
			<>{props.children}</>
		</div>
	)
}

type GroupItemProps = {
	itemId: string
	children: React.ReactNode
}

export const GroupItem: React.FC<GroupItemProps> = props => {
	const { handleDragStart } = useGroups()

	return (
		<div draggable onDragStart={e => handleDragStart(e, props.itemId)}>
			<>{props.children}</>
		</div>
	)
}
