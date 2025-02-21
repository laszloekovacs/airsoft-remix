import React from 'react'

const useAssignmentForm = () => {
	const state = {}

	return [state]
}

type PlayerAssignmentFormProps = {
	initialValues: any
}

const PlayerAssignmentForm = (props: PlayerAssignmentFormProps) => {
	return <div data-testid='player-assignment-form'>PlayerAssignmentForm</div>
}

export default PlayerAssignmentForm
