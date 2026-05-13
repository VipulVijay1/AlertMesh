var dotenv = require('dotenv')
const connectDB = require('./config/db')
const {connectRedis} = require('./config/redis')
const {connectProducer} = require('./config/kafka')

dotenv.config()

const app = require('./app')

var port = process.env.PORT || 3000;

connectDB()
connectRedis()
connectProducer()

app.listen(port , ()=>{
    console.log(`App is listening to port ${port}`)
})