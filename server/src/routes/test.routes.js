const express = require('express')
const router = express.Router()

const {sendTestEvent} = require('../controllers/test.controller')

router.post('/test' , sendTestEvent)

module.exports = router