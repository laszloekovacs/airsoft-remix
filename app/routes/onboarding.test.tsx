import { expect, test } from 'vitest'
import { loader } from './onboarding'
import { useLoaderData } from '@remix-run/react'
import { createRemixStub } from '@remix-run/testing'

test('test the loader', async () => {
	const params = {} as any

	const stub = await loader(params)
})
