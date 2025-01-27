import React from 'react'
import { Link } from 'react-router'

type PropType = {
	name: string
	id: string
	patchFilename: string
}

const OrganizerTitleCard = ({ organizer }: { organizer: PropType }) => {
	const { id, patchFilename, name } = organizer

	return (
		<div>
			<Link to={`/organizer/${id}`}>
				<p>{name}</p>
				<img src={`/upload/content/${id}/${patchFilename}`} />
			</Link>
		</div>
	)
}

export default OrganizerTitleCard
