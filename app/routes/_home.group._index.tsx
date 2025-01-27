import GroupList from '~/components/group-list'

export default function GroupsListingPage() {
	const groups = [
		{
			id: 1,
			name: 'Csoport 1',
			coverPhoto: 'https://picsum.photos/150'
		},
		{
			id: 2,
			name: 'Csoport 2',
			coverPhoto: 'https://picsum.photos/150'
		}
	]

	return (
		<div>
			<h1>Csoportok</h1>
			<section>
				<GroupList groups={groups} />
			</section>
		</div>
	)
}
