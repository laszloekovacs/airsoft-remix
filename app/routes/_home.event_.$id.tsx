import React from 'react'
import type { Route } from './+types/_home.event_.$id'
import { Link, useNavigate } from 'react-router'

// TODO: infer from db type
export const loader = async () => {
	const eventData = {
		title: 'Event Title',
		description: 'Event Description',
		date: '1982.04.13',
		location: 'Event Location',
		organizer: 'Peter',
		imgurl: 'http://www.picsum.photos/200/300'
	}

	return eventData
}

const EventPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, description, date, organizer, imgurl } = loaderData
	const navigate = useNavigate()

	return (
		<div>
			<button onClick={() => navigate(-1)}>vissza</button>

			<p>{date}</p>
			<h2>{title}</h2>
			<h3>szervező: {organizer}</h3>
			<img src={imgurl} alt='Event Image' />
			<div>
				<div>{description}</div>
			</div>
		</div>
	)
}

export default EventPage
