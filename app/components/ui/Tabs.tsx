import { createContext, useContext, useState } from 'react'

type TabContextType = {
	activeIndex: number
	setActiveIndex: (index: number) => void
}

const TabContext = createContext<TabContextType>({
	activeIndex: 0,
	setActiveIndex: () => {}
})

type TabContainerProps = {
	children: React.ReactNode
	defaultActive: number
}
// topmost container
export function TabContainer(props: TabContainerProps) {
	const { children, defaultActive } = props
	const [activeIndex, setActiveIndex] = useState<number>(defaultActive || 0)

	return (
		<div>
			<TabContext.Provider value={{ activeIndex, setActiveIndex }}>
				{children}
			</TabContext.Provider>
		</div>
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
	index: number
}

// trigger to change panels
export function TabTrigger(props: TabTriggerProps) {
	const { children, index } = props
	const { activeIndex, setActiveIndex } = useContext(TabContext)

	const isActive = activeIndex === index

	return (
		<div data-active={isActive} onClick={() => setActiveIndex(index)}>
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

type TabPanelProps = {
	children: React.ReactNode
	index: number
}
// contains the content of the tab
export function TabPanel(props: TabPanelProps) {
	const { children, index } = props
	const { activeIndex } = useContext(TabContext)

	return <>{activeIndex === index ? <div>{children}</div> : null}</>
}
