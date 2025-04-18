

import { Consumer, Kafka, Producer } from 'kafkajs';

export class KafkaCartConsumer {

    private readonly kafkaConfig = {
        clientId: 'cart-service',
        brokers: ['localhost:9092'],
    };
    private producer: Producer;
    private consumer: Consumer;

    constructor() {
        const kafka = new Kafka(this.kafkaConfig);
        this.producer = kafka.producer();
        this.consumer = kafka.consumer({ groupId: 'cart-service-group' });
    }

    async connect(): Promise<void> {
        await this.producer.connect();
    }

    async publishCartRemoved(userId: string, productId: string, productName: string): Promise<void> {
        await this.connect();
        await this.producer.send({
            topic: 'notifications',
            messages: [{
                value: JSON.stringify({
                    userId: userId,
                    productId: productId,
                    timestamp: new Date().toISOString(),
                    product: { name: productName },
                })
            }]
        });
    }
}