import { Link } from 'react-router'

const welcome = () => {
	return (
		<div>
			<p>új felhasználó regisztráció</p>
			<Link to='/'>home</Link>
		</div>
	)
}

export default welcome
