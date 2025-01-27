const Address = ({
	data: { country, city, zip, street }
}: {
	data: { country: string; city: string; zip: string; street: string }
}) => {
	return (
		<div>
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
