type ContactEntry = {
	id: string
	label: string
	value: string
}

// NOTE: filter out sensitive data in the loader
export default function ContactList({
	contacts
}: {
	contacts: ContactEntry[]
}) {
	if (contacts.length === 0) {
		return (
			<section>
				<p>Nincs megjelenithető elérhetőség</p>
			</section>
		)
	}

	const list = contacts.map((contact, index) => {
		return (
			<li key={contact.id}>
				{contact.label}: {contact.value}
			</li>
		)
	})

	return (
		<section>
			<h2>Elérhetőségek</h2>
			<ul>{list}</ul>
		</section>
	)
}
