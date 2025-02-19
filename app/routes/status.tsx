import { EditEventForm } from '~/components/EditEventForm/EditEventForm'

export default function Status() {
	return (
		<div>
			<p className='text-2xl font-bold underline'>hello</p>
			<EditEventForm
				inititalValues={{
					title: '',
					url: '',
					description: '',
					startDate: new Date(),
					coverPhoto: '',
					isPublished: true
				}}
			/>
		</div>
	)
}
