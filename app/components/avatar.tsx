import styles from './avatar.module.css'

export default function Avatar({
	src,
	alt
}: {
	src?: string | null
	alt?: string
}) {
	if (!src) {
		src = '/assets/missing-profile.jpg'
	}

	if (!alt) {
		alt = 'Profile picture'
	}

	return <img className={styles.avatar} src={src} alt={alt} />
}
