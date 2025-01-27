import React from 'react'

type PropType = {
	times: {
		time: string
		subject: string
	}[]
}

const TimeTable = ({ entries }: { entries: PropType }) => {
	const { times } = entries

	const tableRows = times.map((entry, index) => {
		return (
			<tr key={index}>
				<td>{entry.time}</td>
				<td>{entry.subject}</td>
			</tr>
		)
	})

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Time</th>
						<th>Subject</th>
					</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
		</div>
	)
}

export default TimeTable
