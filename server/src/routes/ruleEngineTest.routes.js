const express = require('express')

const router = express.Router()

const {
    testRuleEngine
} = require('../controllers/ruleEngineTest.controller')


router.get('/', testRuleEngine)


module.exports = router