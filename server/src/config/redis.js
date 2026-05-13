const redis = require('redis')

const client = redis.createClient({
    url: process.env.REDIS_URI
})

async function connectRedis(){
    try {
        await client.connect()
        console.log("Redis connected successfully")
    } catch (err) {
        console.log("Redis connection error",err)
    }
}


module.exports = {client,connectRedis}