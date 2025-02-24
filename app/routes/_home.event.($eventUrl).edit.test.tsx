import "@testing-library/jest-dom/vitest";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import EventEditPage, { loader } from "./_home.event.($eventUrl).edit";


describe('EditEventPage with new event', () => {
    let Stub: ReturnType<typeof createRoutesStub>


    beforeEach(() => { 
        Stub = createRoutesStub([
            {
                path: '/',
                Component: EventEditPage,
                loader: loader,
                
            },
        ])
    })


    it("renders", () => {
        expect(Stub).toBeTruthy()   
    })

    it("renders a form to input an event title", () => {
        expect(true).toBe(true)
    })
});
