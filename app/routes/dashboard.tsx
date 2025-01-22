import { Outlet, useNavigate, useNavigation } from 'react-router'

const Dashboard = () => {
	const navigate = useNavigate()
	return (
		<div className='container'>
			<header>
				<button onClick={() => navigate(-1)}>vissza</button>
				<h2>Dashboard</h2>
			</header>

			<Outlet />

			<div>
				<p>Dashboard</p>
			</div>
		</div>
	)
}

export default Dashboard
