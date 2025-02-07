import { useEffect, useState } from 'react'

type Task = {
	id: number
	time: string
	description: string
}

export default function TimeTable({
	onChange
}: {
	onChange?: (value: Task[]) => void
}) {
	const [task, setTask] = useState<
		Array<{
			id: number
			time: string
			description: string
		}>
	>([])

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const time = formData.get('time') as string
		const description = formData.get('description') as string

		if (time && description) {
			setTask([...task, { id: Date.now(), time, description }])
		}

		// clear form
		e.currentTarget.reset()
	}

	const handleRemove = (id: number) => {
		setTask(task.filter(t => t.id !== id))
	}

	useEffect(() => {
		if (onChange) {
			onChange(task)
		}
	}, [task])

	return (
		<div>
			<h1>TimeTable</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor='time'>Időpont</label>
				<input type='time' name='time' id='time' />
				<br />
				<label htmlFor='description'>Leírás</label>
				<input type='text' name='description' id='description' />

				<button>hozzáad</button>
			</form>

			<ul>
				{task.map(t => (
					<li key={t.id}>
						{t.time} - {t.description}
						<button onClick={() => handleRemove(t.id)}>x</button>
					</li>
				))}
			</ul>
		</div>
	)
}
