import UserEventTable, {
	type UserEventTableRow
} from '~/components/UsersEventTable/UserEventTable'

export default function Status() {
	const data: UserEventTableRow[] = [
		{
			id: '1',
			title: 'Játék neve',
			url: '/',
			startDate: '2002-10-02'
		}
	]

	return (
		<div>
			<UserEventTable eventSummaryList={data} />
		</div>
	)
}
