import { eq } from 'drizzle-orm'
import { user } from '~/schema/auth-schema'
import { db } from '~/services/db.server'

export const updateCallsign = async (id: string, callsign: string) => {
	const result = await db
		.update(user)
		.set({ callsign: callsign })
		.where(eq(user.id, id))
		.returning({ id: user.id, callsign: user.callsign })

	return result
}
