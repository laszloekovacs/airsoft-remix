import { expect, test } from 'vitest'
import { loader } from './onboarding'
import { useLoaderData } from '@remix-run/react'
import { createRemixStub } from '@remix-run/testing'
import { render, screen, waitFor } from '@testing-library/react'

test('test the loader', async () => {
	const RemixStub = createRemixStub([
		{
			path: '/',
			loader
		}
	])

	render(<RemixStub />)

	await waitFor(() => screen.findByText('elfogadom'))
})
