import redis from 'redis'
import util from 'util'

const redisClient = redis.createClient('redis://127.0.0.1:6379')

redisClient.set = util.promisify(redisClient.set)
redisClient.get = util.promisify(redisClient.get)

export default redisClient
