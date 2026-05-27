const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'notification-consumer',
    brokers: ['kafka:9092']
})

const consumer = kafka.consumer({
    groupId: 'notification-group'
})

async function runNotificationConsumer() {

    await consumer.connect()

    console.log('Notification consumer connected')

    await consumer.subscribe({
        topic: 'notification-created',
        fromBeginning: true
    })

    await consumer.run({

        eachMessage: async ({ topic, partition, message }) => {

            const eventData = JSON.parse(
                message.value.toString()
            )

            console.log('Notification Event Received')

            console.log(eventData)

            console.log(
                `Sending ${eventData.channel} notification to ${eventData.userId}`
            )

            console.log('Notification processed successfully')
        }
    })
}

module.exports = runNotificationConsumer