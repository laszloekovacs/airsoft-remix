import TeamTable from './team-table'

type Attendee = {
	id: string
	name: string
	callsign: string
	avatar: string
	group: string
}

type Faction = {
	name: string
	members: Attendee[]
}

type AttendeesTableData = {
	factions: Faction[]
}

export default function AttendeesTableContainer({
	data
}: {
	data: AttendeesTableData
}) {
	if (!data) {
		return <div>nincs még jelentkező</div>
	}

	return (
		<div>
			<h2>Résztvevők</h2>
			<FactionsList factions={data.factions} />
		</div>
	)
}

const FactionsList = ({ factions }: { factions: Faction[] }) => {
	return (
		<div>
			<ul>
				{factions.map(faction => (
					<div>
						<h3>{faction.name}</h3>
						<TeamTable key={faction.name} players={faction.members} />
					</div>
				))}
			</ul>
		</div>
	)
}
