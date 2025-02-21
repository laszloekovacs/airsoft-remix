import { useState, type DragEventHandler } from 'react'

export default function Status() {
	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		data: string
	) => {
		e.dataTransfer.setData('text/plain', data)
		e.dataTransfer.effectAllowed = 'move'

		console.log('grabbed', e.dataTransfer.getData('text/plain'))
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()

		const data = e.dataTransfer.getData('text/plain')

		console.log('dropped', data)
	}

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		console.log('drag end', e.dataTransfer.getData('text/plain'))
	}

	return (
		<div>
			<div
				draggable
				onDragStart={e => handleDragStart(e, '1')}
				onDragEnd={handleDragEnd}>
				drag me
			</div>

			<div
				className='bg-amber-300 w-16 h-16'
				onDragOver={e => e.preventDefault()}
				onDrop={handleDrop}>
				drop here
			</div>
		</div>
	)
}
