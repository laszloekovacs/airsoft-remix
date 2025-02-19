import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
	TabContainer,
	TabPanel,
	TabPanelList,
	TabTrigger,
	TabTriggerList
} from './Tabs'
const Elements = () => (
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
)

describe('Tab ui', () => {
	beforeEach(() => {
		render(<Elements />)
	})

	afterEach(() => {
		cleanup()
	})

	it('should render tab titles and panel content', () => {
		expect(screen.getByText('Tab 1')).toBeInTheDocument()
		expect(screen.getByText('Panel 1')).toBeInTheDocument()
	})

	it('clicking on tab 2 should show panel 2', async () => {
		await userEvent.click(screen.getByText('Tab 2'))

		expect(screen.queryByText('Panel 1')).not.toBeInTheDocument()
		expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()
	})
})
