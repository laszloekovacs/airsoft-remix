import { createContext, useContext, useState } from 'react'

type TabContextType = {
	activeTab: string
	setActiveTab: (tab: string) => void
}

const TabContext = createContext<TabContextType>({
	activeTab: '',
	setActiveTab: () => {}
})

type TabContainerProps = {
	children: React.ReactNode
	defaultActive: string
}
// topmost container
export function TabContainer(props: TabContainerProps) {
	const { children, defaultActive } = props
	const [activeTab, setActiveTab] = useState<string>(defaultActive || '')

	return (
		<div>
			<TabContext.Provider value={{ activeTab, setActiveTab }}>
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
	const { activeTab, setActiveTab } = useContext(TabContext)

	return <>{activeTab === value && children}</>
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
	const { activeTab, setActiveTab } = useContext(TabContext)

	return (
		<div
			data-state={value === activeTab ? 'active' : 'inactive'}
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
