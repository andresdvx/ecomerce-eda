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

    async publishCartUpdated(data: ProductToCartDto): Promise<void> {
        await this.connect();
        await this.producer.send({
            topic: 'cart-updates',
            messages: [{ value: JSON.stringify(data) }]
        });
    }

    async publishCartRemoved(userId: string, productId: string): Promise<void> {
        await this.connect();

        await this.producer.send({
            topic: 'cart-removals',
            messages: [{ value: JSON.stringify({ userId, productId }) }]
        });
    }
}