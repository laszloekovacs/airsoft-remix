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
	return <div>UserEventTable</div>
}

export default UserEventTable
