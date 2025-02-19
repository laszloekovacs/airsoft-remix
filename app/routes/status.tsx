import { EditEventForm } from '~/components/EditEventForm/EditEventForm'

export default function Status() {
	return (
		<EditEventForm
			inititalValues={{
				title: '',
				url: '',
				description: '',
				startDate: new Date()
			}}
		/>
	)
}
