import { Kafka, Producer } from 'kafkajs';
import { ProductEventPublisher } from '../../domain/events/product-event.publisher';
import { ProductDto } from '../../domain/schema/product.schema';

export class KafkaProductPublisher implements ProductEventPublisher {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'product-service',
      brokers: ['localhost:9092']
    });
    this.producer = kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async publishProductCreated(product: ProductDto): Promise<void> {
    await this.producer.send({
      topic: 'product-created',
      messages: [{
        value: JSON.stringify({
          eventType: 'ProductCreated',
          data: product,
          timestamp: new Date().toISOString()
        })
      }]
    });
  }
}