import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, logLevel, Producer } from 'kafkajs';
import { KafkaMessageValue } from 'src/common/kafka/kafka-message.interface';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'users-service',
    brokers: ['localhost:9092'],
    logLevel: logLevel.ERROR,
  });
  private producer: Producer = this.kafka.producer();

  async onModuleInit() {
    console.info('Connecting to Kafka...');
    await this.producer.connect();
    console.info('Kafka connected!');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async emit(topic: string, message: any) {
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
      console.error('Error sending message:', error);
    }
  }

  public buildKafkaMessage(
    topic: string,
    payload: any,
    originTopic: string,
    snapshot: Record<string, any> = {},
  ): KafkaMessageValue {
    return {
      timestamp: new Date().toLocaleString(),
      source: 'UserService',
      topic,
      originTopic,
      payload,
      snapshot,
    };
  }
}
