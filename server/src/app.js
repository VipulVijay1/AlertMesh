const express = require('express')
const cors = require('cors')

const app = express()
const notificationRoutes = require('./routes/notification.routes')
const alertRuleRoutes = require('./routes/alertRule.routes')
const ruleEngineTestRoutes = require('./routes/ruleEngineTest.routes')

app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use('/api/notifications',notificationRoutes)
app.use('/api/rules',alertRuleRoutes)
app.use('/api/rule-engine-test', ruleEngineTestRoutes)

module.exports = app