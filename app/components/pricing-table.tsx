type PropType = {
	price: number
	label: string
}

const PricingTable = ({ prices }: { prices?: Array<PropType> }) => {
	if (!prices) {
		return (
			<div>
				<p>nincs megjeleníthető ár</p>
			</div>
		)
	}

	const priceList = prices.map(entry => {
		return (
			<tr key={entry.label}>
				<td>{entry.label}</td>
				<td>{entry.price}</td>
			</tr>
		)
	})

	return (
		<div>
			{
				<table>
					<thead>
						<tr>
							<th colSpan={2}>Árak</th>
						</tr>
					</thead>
					<tbody>{priceList}</tbody>
				</table>
			}
		</div>
	)
}

export default PricingTable
