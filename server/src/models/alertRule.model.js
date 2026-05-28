const mongoose = require('mongoose')

const conditionSchema = new mongoose.Schema({

    field: {
        type: String,
        required: true
    },

    operator: {
        type: String,
        enum: [
            'equals',
            'not_equals',
            'greater_than',
            'less_than',
            'contains'
        ],
        required: true
    },

    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }

}, { _id: false })


const alertRuleSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    ruleName: {
        type: String,
        required: true,
        trim: true
    },

    source: {
        type: String,
        required: true,
        enum: ['github', 'uptime', 'system']
    },

    matchType: {
        type: String,
        enum: ['AND', 'OR'],
        default: 'AND'
    },

    conditions: {
        type: [conditionSchema],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0
            },
            message: 'At least one condition is required'
        }
    },

    severity: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'MEDIUM'
    },

    channels: {
        type: [String],
        enum: ['email', 'webhook', 'whatsapp', 'in-app'],
        required: true
    },

    enabled: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('AlertRule', alertRuleSchema)