import { afterEach, beforeEach, describe, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import UserIndexPage, { loader } from './_home.user._index'

describe('UserIndexPage', () => {
	beforeEach(() => {
		const Stub = createRoutesStub([
			{
				path: '/',
				Component: UserIndexPage,
				loader
			}
		])
		render(<Stub />)
	})

	afterEach(() => {
		cleanup()
	})

	it('loader should return a valid user event list', async () => {})
})
