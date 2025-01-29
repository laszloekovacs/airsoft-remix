import { Link } from 'react-router'
import styles from './home-header.module.css'

export function HomeHeader() {
	return (
		<header>
			<Link to='/'>
				<h1 className={styles.title}>Airsoft Naptár</h1>
			</Link>
		</header>
	)
}
