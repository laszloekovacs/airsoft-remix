import { createClient } from 'redis'

/*
export const redisClient = await createClient({
  url: process.env.REDIS_URL
})
.on('error', (err) => console.log('Redis Client Error', err))
.connect()

// usage
await redisClient.set('foo', 'bar')
const result = await redisClient.get('foo')

*/
