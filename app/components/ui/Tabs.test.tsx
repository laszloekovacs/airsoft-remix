import { describe, expect, it } from 'vitest'
import { TabContainer, TabList, TabPanel, Tabs, TabTrigger } from './Tabs'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

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
	const elements = it('should render divs and content', () => {
		render(<Elements />)

		expect(screen.getByText('Tab 1')).toBeInTheDocument()
		expect(screen.getByText('Panel 2')).toBeInTheDocument()
	})
})
