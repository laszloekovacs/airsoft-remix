import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { EditEventTitleForm } from "./EditEventTitleForm";
import { generateUrlName } from "~/helpers/generate-url-name";


describe('EditEventTitleForm', () => {


    let Stub: ReturnType<typeof createRoutesStub>

    beforeEach(() => {
        Stub = createRoutesStub([
            {
                path: '/',
                Component: EditEventTitleForm
            }
        ])

        render(<Stub initialEntries={["/"]} initialIndex={0} />)
    })

    it('should render a form, title label and a title input', () => {

        expect(document.querySelector('form')).toBeInTheDocument()
        expect(document.querySelector('label')).toBeInTheDocument()
        expect(document.querySelector('input[name="title"]')).toBeInTheDocument()
    })

    it('should render the generated url', () => {
        const url = generateUrlName('event title')

        expect(document.querySelector('#generated-url')).toBeInTheDocument()
        expect(document.querySelector('#generated-url')).toHaveTextContent(url)
    })
})
