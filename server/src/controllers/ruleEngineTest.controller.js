const { evaluateEvent } = require('../services/ruleEngine.service')


async function testRuleEngine(req, res) {

    try {

        const sampleEvent = {

            source: 'github',

            eventType: 'push',

            payload: {

                branch: 'main',

                commitCount: 7
            }
        }


        const matchedRules = await evaluateEvent(sampleEvent)


        return res.status(200).json({

            success: true,

            event: sampleEvent,

            matchedRules
        })

    } catch (error) {

        console.log('RuleEngine Test Error', error)

        return res.status(500).json({

            success: false,

            message: 'RuleEngine test failed'
        })
    }
}


module.exports = {
    testRuleEngine
}