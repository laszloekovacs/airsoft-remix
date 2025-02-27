// vitest.setup.ts
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { createRoutesStub } from 'react-router'

// Run cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
	cleanup()
	vi.restoreAllMocks()
})
