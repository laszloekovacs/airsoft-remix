type PropType = {
	price: number
	label: string
}

const PricingTable = ({ prices }: { prices?: Array<PropType> }) => {
	if (!prices) {
		return (
			<figure>
				<figcaption>Árak</figcaption>
				<p>nincs megjeleníthető ár</p>
			</figure>
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
		<figure>
			<figcaption>Árak</figcaption>
			<table>
				<tbody>{priceList}</tbody>
			</table>
		</figure>
	)
}

export default PricingTable
