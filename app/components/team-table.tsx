// html table for displaying a list of users

type TeamTableProps = {
	players: Array<{
		id: string
		avatar: string
		callsign: string
		group: string
	}>
}

export default function TeamTable({ players }: TeamTableProps) {
	const rows = players.map(player => (
		<tr key={player.id}>
			<td>
				<img src={player.avatar} alt={player.callsign} />
			</td>

			<td>{player.callsign}</td>
			<td>{player.group}</td>
		</tr>
	))

	return (
		<div>
			<p>létszám:{players.length}</p>
			<table>
				<thead>
					<tr>
						<th>Avatar</th>

						<th>Callsign</th>
						<th>Group</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	)
}
