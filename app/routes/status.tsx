import { EditEventForm } from '~/components/EditEventForm/EditEventForm'
import {
	TabContainer,
	TabPanel,
	TabPanelList,
	TabTrigger,
	TabTriggerList
} from '~/components/ui/Tabs'

export default function Status() {
	return (
		<div>
			<p className='text-2xl font-bold underline'>hello</p>

			<TabContainer>
				<TabTriggerList>
					<TabTrigger value='1'>Tab 1</TabTrigger>
					<TabTrigger value='2'>Tab 2</TabTrigger>
					<TabTrigger value='3'>Tab 3</TabTrigger>
				</TabTriggerList>
				<TabPanelList>
					<TabPanel value='1'>Panel 1</TabPanel>
					<TabPanel value='2'>Panel 2</TabPanel>
					<TabPanel value='3'>Panel 3</TabPanel>
				</TabPanelList>
			</TabContainer>
		</div>
	)
}
