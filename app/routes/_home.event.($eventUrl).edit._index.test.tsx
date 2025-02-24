import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import EventEditIndexPage from "./_home.event.($eventUrl).edit._index";


describe("Edit event index page", () => {
    let Stub: ReturnType<typeof createRoutesStub>

    beforeEach(() => {
        Stub = createRoutesStub([
            {
                path: "/",
                Component: () => <EventEditIndexPage loaderData={{ user: "mike" }} params={{ eventUrl: "test" }} matches={{} as any} />,
            }
        ])

        render(<Stub />)
    })


    it("renders properly", () => {
        expect(screen.getByText("mike")).toBeInTheDocument()
    })
})
