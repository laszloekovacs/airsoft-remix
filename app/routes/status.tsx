import {
	Button,
	Container,
	Flex,
	Table,
	Text,
	ThemePanel
} from '@radix-ui/themes'

export default function Status() {
	return (
		<Container p='8'>
			<Table.Root size={'2'}>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Esemény</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Időpont</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Jelentkezők</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.RowHeaderCell>Joteknysagi jatek</Table.RowHeaderCell>
						<Table.RowHeaderCell>12:30</Table.RowHeaderCell>
						<Table.RowHeaderCell>3</Table.RowHeaderCell>
					</Table.Row>
				</Table.Body>
			</Table.Root>

			<ThemePanel />
		</Container>
	)
}
