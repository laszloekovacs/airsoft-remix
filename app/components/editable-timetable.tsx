import { useEffect, useState } from 'react'

type Task = {
	time: string
	description: string
}

export function EditableTimeTable({
	value,
	onChange
}: {
	value?: Task[]
	onChange?: (value: Task[]) => void
}) {
	const [task, setTask] = useState<Array<Task>>(value || [])

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const time = formData.get('time') as string
		const description = formData.get('description') as string

		if (time && description) {
			setTask([...task, { time, description }])
		}

		// clear form
		e.currentTarget.reset()
	}

	const handleRemove = (time: string) => {
		setTask(task.filter(t => t.time !== time))
	}

	useEffect(() => {
		if (onChange) {
			onChange(task)
		}
	}, [task])

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='time'>Időpont</label>
				<input type='time' name='time' id='time' required />
				<br />
				<label htmlFor='description'>Leírás</label>
				<input type='text' name='description' id='description' required />

				<button>hozzáad</button>
			</form>

			<ul>
				{task.map(t => (
					<li key={t.time}>
						{t.time} - {t.description}
						<button onClick={() => handleRemove(t.time)}>x</button>
					</li>
				))}
			</ul>
			<pre>{JSON.stringify(task, null, 2)}</pre>
		</div>
	)
}
