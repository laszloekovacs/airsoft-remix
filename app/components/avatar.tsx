import styles from './avatar.module.css'

export default function Avatar({
	src,
	alt
}: {
	src?: string | null
	alt?: string | null
}) {
	const imgUrl = src ?? '/assets/missing-profile.jpg'

	return <img className={styles.avatar} src={imgUrl} alt={'avatar'} />
}
