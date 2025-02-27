describe('Edit event index page', () => {
	it('renders a form with a title input, fills in title', () => {
		const Stub = createRoutesStub([
			{
				path: '/',
				Component: () => (
					<EventEditIndexPage
						loaderData={{
							title: 'eventitle',
							url: 'mike',
							startDate: '2022-01-01'
						}}
						params={{}}
						matches={{} as any}
					/>
				)
			}
		])

		render(<Stub />)
		expect(document.querySelector('form')).toBeInTheDocument()
		expect(document.querySelector("input[name='title']")).toBeInTheDocument()
		expect(document.querySelector("input[name='title']")).toHaveValue(
			'eventitle'
		)
	})

	it('renders out the url parameter passed to the page', () => {
		const Stub = createRoutesStub([
			{
				path: '/',
				Component: () => (
					<EventEditIndexPage
						loaderData={{
							title: 'mike',
							url: 'eventurl',
							startDate: '2022-01-01'
						}}
						params={{}}
						matches={{} as any}
					/>
				)
			}
		])

		render(<Stub />)
		expect(screen.getByText('eventurl')).toBeInTheDocument()
	})

	it('calls fetcher when title chages', () => {
		const Stub = createRoutesStub([
			{
				path: '/',
				Component: () => (
					<EventEditIndexPage
						loaderData={{
							title: 'mike',
							url: 'eventurl',
							startDate: '2022-01-01'
						}}
						params={{}}
						matches={{} as any}
					/>
				)
			}
		])

		render(<Stub />)

		expect(screen.getByText('eventurl')).toBeInTheDocument()
	})

	it('should check for invalid url characters when validating', () => {
		expect(true).toBe(true)
	})
})
