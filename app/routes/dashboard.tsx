import { Outlet } from 'react-router'

const Dashboard = () => {
	return (
		<div className='container mx-auto'>
			<h2>Dashboard</h2>
			<Outlet />
		</div>
	)
}

export default Dashboard
