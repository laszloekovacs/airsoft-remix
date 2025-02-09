import { Link } from 'react-router'
import Avatar from './avatar'
import CoverPhoto from './cover-photo'

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
	return (
		<section>
			<Link to={url}>
				<h3>{name}</h3>
				{/* patch of the group */}
				<Avatar />
			</Link>
		</section>
	)
}

export default OrganizerTitleCard
