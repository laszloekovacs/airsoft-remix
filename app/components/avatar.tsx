export default function Avatar({
	src,
	alt
}: {
	src?: string | null
	alt?: string | null
}) {
	const imgUrl = src ?? '/assets/missing-profile.jpg'

	return <img className='max-w-10' src={imgUrl} alt={'avatar'} />
}
