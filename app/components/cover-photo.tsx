const CoverPhoto = ({ src }: { src?: string }) => {
	const url = src ? src : 'https://picsum.photos/820/312'

	return <img src={url} alt='cover photo' />
}

export default CoverPhoto
