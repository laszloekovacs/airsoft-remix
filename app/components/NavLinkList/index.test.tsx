import { expect, it } from 'vitest'
import { NavLinkList } from '.'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { createRoutesStub } from 'react-router'

it('should render a nav element', () => {
	render(<NavLinkList items={[]} />)

	expect(document.querySelector('nav')).toBeInTheDocument()
})

it('should render a list item', () => {
	const items = [{ name: 'test', to: '/' }]
	const Component = () => <NavLinkList items={items} />

	const Stub = createRoutesStub([
		{
			path: '/',
			Component
		}
	])

	render(<Stub />)

	expect(document.querySelector('li')).toBeInTheDocument()
})

it('should render a link', () => {
	const items = [{ name: 'test', to: '/home' }]
	const Component = () => <NavLinkList items={items} />

	const Stub = createRoutesStub([
		{
			path: '/',
			Component
		}
	])

	render(<Stub />)

	expect(document.querySelector('a')).toBeInTheDocument()
	expect(document.querySelector('a')).toHaveAttribute('href', '/home')
})
