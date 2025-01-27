type TimesType = {
	time: string
	label: string
}

const TimeTable = ({ date, times }: { date: string; times: TimesType[] }) => {
	const tableRows = times.map((entry, index) => {
		return (
			<tr key={index}>
				<td>{entry.time}</td>
				<td>{entry.label}</td>
			</tr>
		)
	})

	return (
		<div>
			<div>{date}</div>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>Időpontok</th>
					</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
		</div>
	)
}

export default TimeTable
