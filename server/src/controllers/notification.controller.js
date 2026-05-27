const { producer } = require('../config/kafka')

async function createNotification(req, res) {

    try {

        console.log('Notification controller reached')

        const eventPayload = {
            notificationId: Date.now().toString(),
            userId: req.body.userId,
            channel: req.body.channel,
            message: req.body.message,
            createdAt: new Date().toISOString()
        }

        await producer.send({

            topic: 'notification-created',

            messages: [
                {
                    value: JSON.stringify(eventPayload)
                }
            ]
        })

        return res.status(202).json({

            success: true,
            message: 'Notification event accepted',

            data: eventPayload
        })

    } catch (error) {

        console.log('Notification event error', error)

        return res.status(500).json({

            success: false,
            message: 'Failed to publish notification event'
        })
    }
}

module.exports = {
    createNotification
}