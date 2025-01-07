import React from 'react'
import { Link } from 'react-router'

const PageFooter = () => {
	return (
		<div>
			<span>PageFooter</span>
			<div>
				<Link to='/dashboard'>Dashboard</Link>
			</div>
		</div>
	)
}

export default PageFooter
