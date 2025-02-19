import { createContext, useContext, useState } from 'react'

type TabContextType = {
	activeTab: string
	setActiveTab: (tab: string) => void
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const TabContext = createContext<TabContextType>({
	activeTab: '',
	setActiveTab: () => {},
	handleKeyDown: () => {}
})

type TabContainerProps = {
	children: React.ReactNode
	defaultActive: string
}
// topmost container
export function TabContainer(props: TabContainerProps) {
	const { children, defaultActive } = props
	const [activeTab, setActiveTab] = useState<string>(defaultActive || '')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			setActiveTab(e.currentTarget.dataset.value || '')
		}
	}

	return (
		<div>
			<TabContext.Provider value={{ activeTab, setActiveTab, handleKeyDown }}>
				{children}
			</TabContext.Provider>
		</div>
	)
}

type TabPanelProps = {
	children: React.ReactNode
	value: string
}
// contains the content of the tab
export function TabPanel(props: TabPanelProps) {
	const { children, value } = props
	const { activeTab } = useContext(TabContext)

	return (
		<>{activeTab === value ? <div data-value={value}>{children}</div> : null}</>
	)
}

// container for triggers
type TabTriggerListProps = {
	children: React.ReactNode
}
export function TabTriggerList(props: TabTriggerListProps) {
	const { children } = props

	return <div>{children}</div>
}

type TabTriggerProps = {
	children: React.ReactNode
	value: string
}
// trigger to change panels
export function TabTrigger(props: TabTriggerProps) {
	const { children, value } = props
	const { activeTab, setActiveTab, handleKeyDown } = useContext(TabContext)

	return (
		<div
			tabIndex={0}
			data-state={value === activeTab ? 'active' : 'inactive'}
			onKeyDown={handleKeyDown}
			onClick={() => setActiveTab(value)}>
			{children}
		</div>
	)
}

// container for tab panels

type TabPanelListProps = {
	children: React.ReactNode
}
export function TabPanelList(props: TabPanelListProps) {
	const { children } = props
	return <div>{children}</div>
}
