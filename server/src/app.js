const express = require('express')
const cors = require('cors')

const app = express()
const notificationRoutes = require('./routes/notification.routes')

app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use('/api/notifications',notificationRoutes)

module.exports = app