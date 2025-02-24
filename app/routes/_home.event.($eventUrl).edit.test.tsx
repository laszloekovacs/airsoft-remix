import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import EventEditPage from "./_home.event.($eventUrl).edit";


describe('EditEventPage with new event', () => {
    it('renders the route', () => {
        const Stub = createRoutesStub([
            {
                path: '/event/edit',
                Component: EventEditPage,
            }
        ])

        render(<Stub initialEntries={['/event/edit']} />)

        expect(screen.getByRole('heading')).toBeInTheDocument()
        expect(screen.getByText('Esemény szerkesztése')).toBeInTheDocument()
    })
})

