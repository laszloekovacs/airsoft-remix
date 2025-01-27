type PropType = {
	prices: Array<{
		price: number
		label: string
	}>
}

const PricingTable = ({ pricing }: { pricing: PropType }) => {
	const { prices } = pricing

	const priceList = prices.map(price => {
		return (
			<tr key={price.price}>
				<td>{price.price}</td>
				<td>{price.label}</td>
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
