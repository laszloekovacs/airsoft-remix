import styles from './avatar.module.css'

export default function Avatar({ src, alt }: { src?: string; alt?: string }) {
	const imgUrl = src ?? '/assets/missing-profile.jpg'

	return <img className={styles.avatar} src={imgUrl} alt={'avatar'} />
}
