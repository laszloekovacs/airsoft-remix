type TimesType = {
	time: string
	subject: string
}

const TimeTable = ({ times }: { times: TimesType[] }) => {
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
