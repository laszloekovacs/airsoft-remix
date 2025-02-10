import {
	Button,
	Container,
	Flex,
	Table,
	TextField,
	ThemePanel
} from '@radix-ui/themes'
import { Form } from 'radix-ui'

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

			<Form.Root>
				<Form.Field name='time'>
					<Form.Label>Időpont</Form.Label>
					<Form.Control asChild>
						<input type='time' name='time' />
					</Form.Control>
				</Form.Field>

				<Form.Submit asChild>
					<Button>Submit</Button>
				</Form.Submit>
			</Form.Root>

			<ThemePanel />
		</Container>
	)
}
