const { producer } = require('../config/kafka')

async function sendTestEvent(req, res) {

    try {
        console.log('controller reached')

        // Create the payload as a variable
        const payload = {
            topic: 'test-topic',
            messages: [
                {
                    value: JSON.stringify({
                        message: 'Hello from AlertMesh Kafka!'
                    })
                }
            ]
        }

        // Log the payload to see what you're sending
        console.log('Sending payload:', payload)

        // Send the payload
        await producer.send(payload)

        res.status(200).json({
            success: true,
            message: 'Event sent successfully'
        })

    } catch (error) {
        console.log('Kafka event error', error)

        res.status(500).json({
            success: false,
            message: 'Failed to send event'
        })
    }
}

module.exports = { sendTestEvent }