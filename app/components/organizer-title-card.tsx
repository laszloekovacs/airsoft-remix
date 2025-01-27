import { Link } from 'react-router'

const OrganizerTitleCard = ({
	id,
	name,
	url,
	patchImgUrl
}: {
	id: string
	name: string
	url: string
	patchImgUrl?: string
}) => {
	const imgUrl = patchImgUrl
		? `/upload/content/${id}/${patchImgUrl}`
		: '/assets/missing-profile.jpg'

	return (
		<div>
			<Link to={url}>
				<p>{name}</p>
				<img src={imgUrl} alt={name} />
			</Link>
		</div>
	)
}

export default OrganizerTitleCard
