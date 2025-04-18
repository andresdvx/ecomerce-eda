import { Kafka, Producer } from 'kafkajs';
import { EventPublisher } from '../../domain/events/cart-event-publisher';
import { ProductToCartDto } from '../../domain/schema/cart.schema';

export class KafkaEventPublisher implements EventPublisher {

    private readonly kafkaConfig = {
        clientId: 'cart-service',
        brokers: ['localhost:9092'],
    };
    private producer: Producer;

    constructor() {
        const kafka = new Kafka(this.kafkaConfig);
        this.producer = kafka.producer();
    }

    async connect(): Promise<void> {
        await this.producer.connect();
    }

    async publishCartUpdated({ productId, userId, quantity }: ProductToCartDto): Promise<void> {
        await this.connect();
        await this.producer.send({
            topic: 'cart-updates',
            messages: [{
                value: JSON.stringify({
                    timeStamp: new Date().toISOString(),
                    source: "CardUpdated",
                    topic: "card-updates",
                    payload: {
                        userId: userId,
                        productId: productId,
                        quantity: quantity
                    }
                })
            }]
        });
    }

    async publishCartRemoved(userId: string, productId: string, productName: string): Promise<void> {
        await this.connect();
        await this.producer.send({
            topic: 'cart-removals',
            messages: [{
                value: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    source: "CartRemoval",
                    topic: "notifications",
                    originTopic: "cart-removals",
                    payload: {
                        product: {name: productName},
                        userId: userId,
                    },
                })
            }]
        });
    }
}