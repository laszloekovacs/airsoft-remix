import { Outlet } from 'react-router'

const Dashboard = () => {
	return (
		<div>
			<h2>Dashboard</h2>
			<Outlet />
		</div>
	)
}

export default Dashboard
