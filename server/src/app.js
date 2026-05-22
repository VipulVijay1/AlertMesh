const express = require('express')
const cors = require('cors')

const app = express()
const testRoutes = require('./routes/test.routes')


app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})


app.use('/api', testRoutes)

module.exports = app