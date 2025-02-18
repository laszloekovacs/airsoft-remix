type AddressProps = {
	address: {
		country: string
		city: string
		zip: string
		street: string
	}
}

const Address = ({ address }: AddressProps) => {
	const { country, city, zip, street } = address

	return (
		<div>
			<h3>Cim</h3>
			<address>
				<p>{country}</p>
				<p>{city}</p>
				<p>{zip}</p>
				<p>{street}</p>
			</address>
			<p>megtekintés térképen</p>
		</div>
	)
}

export default Address
