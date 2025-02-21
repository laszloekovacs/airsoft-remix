import React from 'react'

type UserEventTableItem = {
	id: string
	title: string
	url: string
}

type Props = {
	eventSummaryList: UserEventTableItem[]
}

const UserEventTable = ({ eventSummaryList }: Props) => {
	return (
		<table>
			<th>
				<tr>
					<td>dátum</td>
					<td>Játék neve</td>
				</tr>
			</th>
			<td>
				{eventSummaryList.map(event => (
					<UserEventTableRow key={event.id} />
				))}
			</td>
		</table>
	)
}

const UserEventTableRow = () => {
	return (
		<tr>
			<td>hello</td>
		</tr>
	)
}

export default UserEventTable
