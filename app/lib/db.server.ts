import { drizzle } from 'drizzle-orm/node-postgres'

export const drizzleClient = drizzle(process.env.DATABASE_URL!)
