const AlertRule = require('../models/alertRule.model')


const operators = {

    equals: (actualValue, expectedValue) => {
        return actualValue === expectedValue
    },

    not_equals: (actualValue, expectedValue) => {
        return actualValue !== expectedValue
    },

    greater_than: (actualValue, expectedValue) => {
        return actualValue > expectedValue
    },

    less_than: (actualValue, expectedValue) => {
        return actualValue < expectedValue
    },

    contains: (actualValue, expectedValue) => {

        if (typeof actualValue !== 'string') {
            return false
        }

        return actualValue.includes(expectedValue)
    }
}



function evaluateCondition(condition, payload) {

    const actualValue = payload[condition.field]

    const expectedValue = condition.value

    const operatorHandler = operators[condition.operator]

    if (!operatorHandler) {
        return false
    }

    return operatorHandler(actualValue, expectedValue)
}



function evaluateRule(rule, payload) {

    const results = rule.conditions.map(condition => {
        return evaluateCondition(condition, payload)
    })


    if (rule.matchType === 'AND') {
        return results.every(result => result === true)
    }


    if (rule.matchType === 'OR') {
        return results.some(result => result === true)
    }

    return false
}



async function evaluateEvent(event) {

    try {

        console.log('RuleEngine evaluating event')


        const rules = await AlertRule.find({
            source: event.source,
            enabled: true
        })


        const matchedRules = []


        for (const rule of rules) {

            const isMatched = evaluateRule(
                rule,
                event.payload
            )


            if (isMatched) {

                matchedRules.push(rule)
            }
        }


        return matchedRules

    } catch (error) {

        console.log('RuleEngine Error', error)

        return []
    }
}



module.exports = {
    evaluateEvent
}