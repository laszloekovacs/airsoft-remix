import { Link } from 'react-router'

const WelcomePage = () => {
	return (
		<div>
			<p>Sikeresen regisztráltál!</p>
			<Link to='/'>home</Link>
		</div>
	)
}

export default WelcomePage
