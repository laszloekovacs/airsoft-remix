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
		<figure>
			<figcaption>Időpontok</figcaption>
			<time>{date}</time>
			<table>
				<tbody>{tableRows}</tbody>
			</table>
		</figure>
	)
}

export default TimeTable
