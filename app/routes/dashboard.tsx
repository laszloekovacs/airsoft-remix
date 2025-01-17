import { Outlet, useNavigate, useNavigation } from 'react-router'

const Dashboard = () => {
	const navigate = useNavigate()
	return (
		<div className='container mx-auto'>
			<button onClick={() => navigate(-1)}>vissza</button>
			<h2>Dashboard</h2>
			<Outlet />
		</div>
	)
}

export default Dashboard
