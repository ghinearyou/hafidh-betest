const mongoose = require('mongoose')
const { createClient } = require('redis');

module.exports = {
  mongoConnect: (MONGO_URL, MONGO_DBNAME) => 
    mongoose.connect(`${MONGO_URL}/${MONGO_DBNAME}`).catch(err => {
    if (err) {
      console.log('BAD DB')
      throw err
    }
  }),
  redisConnect: async (REDIS_URL) => {
    const redisClient = await createClient({
      url: REDIS_URL
    })
    // redis://default:JzKIEZiXYIOZCCiKnhxelLCtLGxiwcNp@viaduct.proxy.rlwy.net:58226
    .on('error', err => console.log('Redis Client Error', err))

    try {
      await redisClient.connect()

      Object.assign(global, {
        redisClient
      })
      console.log('Connected to Redis successfully!')
    } catch (e) {
      console.error('Connection to Redis failed with error:')
      console.error(e)
    }
  }
}
