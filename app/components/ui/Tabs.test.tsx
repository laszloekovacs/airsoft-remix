import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TabContainer, TabList, TabPanel, Tabs, TabTrigger } from './Tabs'

const Elements = () => (
	<TabContainer>
		<TabList>
			<TabTrigger>Tab 1</TabTrigger>
			<TabTrigger>Tab 2</TabTrigger>
			<TabTrigger>Tab 3</TabTrigger>
		</TabList>
		<Tabs>
			<TabPanel>Panel 1</TabPanel>
			<TabPanel>Panel 2</TabPanel>
			<TabPanel>Panel 3</TabPanel>
		</Tabs>
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
		expect(screen.getByText('Panel 2')).toBeInTheDocument()
	})
})
