import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, logLevel, Producer } from 'kafkajs';
import { KafkaMessageValue } from 'src/common/kafka/interfaces/kafka-message.interface';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'users-service',
    brokers: ['localhost:9092'],
    logLevel: logLevel.ERROR,
  });
  private producer: Producer = this.kafka.producer();

  async onModuleInit() {
    console.info('Connecting to Kafka ...');
    await this.producer.connect();
    console.info('✅ Kafka connected!');
  }
  
  async emit(topic: string, message: KafkaMessageValue) {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  }
}
