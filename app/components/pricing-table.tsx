type PropType = {
	prices: Array<{
		price: number
		description: string
	}>
}

const PricingTable = ({ pricing }: { pricing: PropType }) => {
	const { prices } = pricing

	const priceList = prices.map(price => {
		return (
			<tr key={price.price}>
				<td>{price.price}</td>
				<td>{price.description}</td>
			</tr>
		)
	})

	return (
		<div>
			{
				<table>
					<thead>
						<tr>
							<th>Price</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>{priceList}</tbody>
				</table>
			}
		</div>
	)
}

export default PricingTable
