const express = require('express')

const router = express.Router()

const{ createAlertRule } = require('../controllers/alertRule.controller')

router.post('/',createAlertRule)

module.exports = router