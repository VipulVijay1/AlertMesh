const AlertRule = require('../models/alertRule.model')

async function createAlertRule(req,res){
    try{
        console.log('Created Alert Rule controller reached')

        const ruleData = {
            userId: req.body.userId,
            ruleName: req.body.ruleName,
            source: req.body.source,
            matchType: req.body.matchType,
            conditions: req.body.conditions,
            severity: req.body.severity,
            channels: req.body.channels,
            enabled: req.body.enabled
        }

        const alertRule = new AlertRule(ruleData)

        await alertRule.save()

        return res.status(201).json({
            success: true,
            message: 'Alert rule created successfully',
            data: alertRule
        })
    } catch(error){
        console.log('Created Alert Rule Error',error)

        return res.status(500).json({
            success: false,
            message: 'Failed to create alert rule'
        })
    }
}

module.exports = {
    createAlertRule
}