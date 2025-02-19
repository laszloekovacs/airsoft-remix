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
)

describe('Tab ui', () => {
	beforeEach(() => {
		render(<Elements />)
	})

	afterEach(() => {
		cleanup()
	})

	it('should render divs and content', () => {
		expect(screen.getByText('Tab 1')).toBeInTheDocument()
		expect(screen.getByText('Panel 1')).toBeInTheDocument()
	})

	it('clicking on tab 2 should set tab 2 data-active attribute', async () => {
		await userEvent.click(screen.getByText('Tab 2'))

		expect(
			screen.getByText('Tab 2').getAttribute('data-active-tab')
		).toBeTruthy()

		// should also render the content of panel 2
		expect(screen.getByText('Panel 2')).toBeInTheDocument()

		// and should not render other panels content
		expect(screen.queryByText('Panel 1')).not.toBeInTheDocument()
		expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()
	})
})
