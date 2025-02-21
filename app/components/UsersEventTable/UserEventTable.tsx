import { Link } from 'react-router'

export type UserEventTableRow = {
	id: string
	title: string
	url: string
	startDate: string
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

const UserEventTableRow = (props: UserEventTableRow) => {
	return (
		<tr>
			<td>{props.startDate}</td>
			<td>
				<Link to={props.url}>{props.title}</Link>
			</td>
		</tr>
	)
}

export default UserEventTable
