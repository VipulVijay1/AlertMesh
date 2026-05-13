const { Kafka } = require('kafkajs')  

const kafka = new Kafka({
    clientId: 'alertmesh-api',
    brokers: ['kafka:9092']
})

const producer = kafka.producer()

async function connectProducer() {
    try {
        await producer.connect()
        console.log('Kafka producer connected successfully')
    } catch (error) {
        console.error('Kafka connection error', error)
    }
}

module.exports = {
    producer,
    connectProducer
}