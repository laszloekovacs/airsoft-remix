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
	return (
		<section className='my-8'>
			<h2 className='font-bold mb-2'>Elérhetőségek</h2>
			<p>nincs megjeleníthető elérhetőség</p>
		</section>
	)
}
