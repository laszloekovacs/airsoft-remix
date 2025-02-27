import { Link } from 'react-router'

const ByePage = () => {
	return (
		<div>
			<div>
				<h2>Viszlát!</h2>
				<p>sikeresen kiléptél.</p>
			</div>
			<div>
				<Link to='/'>Home</Link>
			</div>
		</div>
	)
}

export default ByePage
