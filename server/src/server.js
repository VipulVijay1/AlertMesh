const dotenv = require('dotenv')

const connectDB = require('./config/db')
const { connectRedis } = require('./config/redis')
const { connectProducer } = require('./config/kafka')
const runNotificationConsumer = require('./consumers/notification.consumer')

dotenv.config()

const app = require('./app')

const port = process.env.PORT || 3000

async function startServer() {

    try {

        await connectDB()

        await connectRedis()

        await connectProducer()

        await runNotificationConsumer()

        app.listen(port, () => {
            console.log(`App is listening to port ${port}`)
        })

    } catch (error) {

        console.log('Server startup error', error)
    }
}

startServer()