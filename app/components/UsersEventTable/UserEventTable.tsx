import { Link } from 'react-router'

type UserEventTableRow = {
	id: string
	title: string
	url: string
}

type Props = {
	eventSummaryList: UserEventTableRow[]
}

const UserEventTable = ({ eventSummaryList }: Props) => {
	return (
		<table>
			<thead>
				<tr>
					<th>dátum</th>
					<th>Játék neve</th>
				</tr>
			</thead>
			<tbody>
				{eventSummaryList.map(event => (
					<UserEventTableRow key={event.id} {...event} />
				))}
			</tbody>
		</table>
	)
}

type UserEventTableRowProps = {
	id: string
	title: string
	url: string
}

const UserEventTableRow = (props: UserEventTableRowProps) => {
	return (
		<tr>
			<td>{props.title}</td>
			<td>
				<Link to={props.url}>{props.title}</Link>
			</td>
		</tr>
	)
}

export default UserEventTable
