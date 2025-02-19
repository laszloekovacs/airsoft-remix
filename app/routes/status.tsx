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

			<TabContainer defaultActive={1}>
				<TabTriggerList>
					<TabTrigger index={1}>Tab 1</TabTrigger>
					<TabTrigger index={2}>Tab 2</TabTrigger>
					<TabTrigger index={3}>Tab 3</TabTrigger>
				</TabTriggerList>
				<TabPanelList>
					<TabPanel index={1}>Panel 1</TabPanel>
					<TabPanel index={2}>Panel 2</TabPanel>
					<TabPanel index={3}>Panel 3</TabPanel>
				</TabPanelList>
			</TabContainer>
		</div>
	)
}
